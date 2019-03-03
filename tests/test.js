import request from 'supertest';
import app from './app';
import truncateExpense from './truncate';
import chai from 'chai';

import { Expense } from '../models';

const assert = chai.assert;

describe('Expense model', () => {
  beforeEach(async () => {
    await truncateExpense();
  });

  it('should return empty expense list', () => {
    return request(app)
      .get('/expenses')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.isArray(res.body);
        assert.equal(res.body.length, 0);
      });
  });

  it('should add expense', () => {
    const expense = { date: '2019-02-12', description: 'courses', cost: 23, buyer: 'Vio' };

    return request(app)
      .post('/expenses')
      .send(expense)
      .expect(201)
      .then(async (res) => {
        assert.isObject(res.body);
        assert.hasAllKeys(res.body, [
          'date',
          'description',
          'cost',
          'buyer',
          'id',
          'createdAt',
          'updatedAt',
        ]);
        assert.equal(res.body.description, expense.description);
        assert.equal(res.body.date, expense.date);
        assert.equal(res.body.cost, expense.cost);
        assert.equal(res.body.buyer, expense.buyer);

        const instance = await Expense.findByPk(res.body.id);

        assert.equal(instance.description, expense.description);
        assert.equal(instance.date, expense.date);
        assert.equal(instance.cost, expense.cost);
        assert.equal(instance.buyer, expense.buyer);
      });
  });

  it('should update expense', async () => {
    const instance = await Expense.create({
      date: '2019-02-12',
      description: 'courses',
      cost: 23,
      buyer: 'Vio',
    });
    const expense = {
      id: instance.id,
      date: '2019-02-12',
      description: 'courses',
      cost: 27,
      buyer: 'Vio',
      createdAt: instance.createdAt,
    };

    return request(app)
      .put(`/expenses/${instance.id}`)
      .send(expense)
      .expect(200)
      .then(async (res) => {
        assert.isObject(res.body);
        assert.hasAllKeys(res.body, [
          'date',
          'description',
          'cost',
          'buyer',
          'id',
          'createdAt',
          'updatedAt',
        ]);

        assert.equal(res.body.description, expense.description);
        assert.equal(res.body.date, expense.date);
        assert.equal(res.body.cost, expense.cost);
        assert.equal(res.body.buyer, expense.buyer);

        const updatedInstance = await Expense.findByPk(res.body.id);

        assert.equal(updatedInstance.description, expense.description);
        assert.equal(updatedInstance.date, expense.date);
        assert.equal(updatedInstance.cost, expense.cost);
        assert.equal(updatedInstance.buyer, expense.buyer);
      });
  });
});

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
    const expense = {
      date: '2019-02-12',
      description: 'courses',
      cost: 23,
      buyer: 'Vio',
    };

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

  it('should delete expense', async () => {
    const instance = await Expense.create({
      date: '2019-02-12',
      description: 'courses',
      cost: 23,
      buyer: 'Vio',
    });

    return request(app)
      .delete(`/expenses/${instance.id}`)
      .expect(204)
      .then(async (res) => {
        assert.isEmpty(res.body);

        const expense = await Expense.findByPk(instance.id);

        assert.isNull(expense);
      });
  });

  it('should return 02/2019 expenses', async () => {
    const one = await Expense.create({
      date: '2019-02-01',
      description: 'courses',
      cost: 23,
      buyer: 'Vio',
    });
    const two = await Expense.create({
      date: '2019-02-02',
      description: 'bk',
      cost: 15,
      buyer: 'Nils',
    });
    const three = await Expense.create({
      date: '2019-02-03',
      description: 'courses',
      cost: 59,
      buyer: 'Vio',
    });
    const jan = await Expense.create({
      date: '2019-01-04',
      description: 'courses',
      cost: 43,
      buyer: 'Nils',
    });

    return request(app)
      .get('/expenses/?year=2019&month=1')
      .expect(200)
      .then(async (res) => {
        assert.isArray(res.body);
        assert.equal(res.body.length, 3);

        assert.equal(res.body[0].description, one.description);
        assert.equal(res.body[0].date, one.date);
        assert.equal(res.body[0].cost, one.cost);
        assert.equal(res.body[0].buyer, one.buyer);

        assert.equal(res.body[1].description, two.description);
        assert.equal(res.body[1].date, two.date);
        assert.equal(res.body[1].cost, two.cost);
        assert.equal(res.body[1].buyer, two.buyer);

        assert.equal(res.body[2].description, three.description);
        assert.equal(res.body[2].date, three.date);
        assert.equal(res.body[2].cost, three.cost);
        assert.equal(res.body[2].buyer, three.buyer);
      });
  });
});

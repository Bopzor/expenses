import request from 'supertest';
import chai from 'chai';
import chaiExclude from 'chai-exclude';

import app from '../api/app';
import { Expense } from '../../models';
import { truncateExpense } from './truncate';

chai.use(chaiExclude);
const assert = chai.assert;

describe('Expense model', () => {
  beforeEach(async () => {
    await truncateExpense();
  });

  it('should return empty expense list', () => {
    return request(app)
      .get('/expenses?year=2019&month=02')
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
    const expected = { ...expense, id: 1 };

    return request(app)
      .post('/expenses')
      .send(expense)
      .expect(201)
      .then(async (res) => {
        assert.deepEqualExcluding(res.body, expected, ['createdAt', 'updatedAt']);

        const expense = await Expense.findByPk(res.body.id);

        assert.deepEqualExcluding(expense.get(), expected, ['createdAt', 'updatedAt', 'id']);
      });
  });

  it('should update expense', async () => {
    const instance = await Expense.create({
      date: '2019-02-12',
      description: 'courses',
      cost: 23,
      buyer: 'Vio',
    });
    const expected = {
      ...instance.get(),
      cost: 27,
    };

    return request(app)
      .put(`/expenses/${instance.id}`)
      .send({ ...instance.get(), cost: 27 })
      .expect(200)
      .then(async (res) => {
        assert.deepEqualExcluding(res.body, expected, ['createdAt', 'updatedAt']);

        const updatedInstance = await Expense.findByPk(res.body.id);

        assert.deepEqualExcluding(updatedInstance.get(), expected, 'updatedAt');
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

        const expected = await Expense.findByPk(instance.id);

        assert.isNull(expected);
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
      .get('/expenses/?year=2019&month=02')
      .expect(200)
      .then(async (res) => {
        assert.isArray(res.body);
        assert.equal(res.body.length, 3);

        assert.deepEqualExcluding(res.body[0], one.get(), ['createdAt', 'updatedAt']);
        assert.deepEqualExcluding(res.body[1], two.get(), ['createdAt', 'updatedAt']);
        assert.deepEqualExcluding(res.body[2], three.get(), ['createdAt', 'updatedAt']);
      });
  });
});

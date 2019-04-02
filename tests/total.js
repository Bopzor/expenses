import request from 'supertest';
import chai from 'chai';

import app from '../api/app';
import { Advance, Expense } from '../../models';
import { truncateAdvance, truncateExpense } from './truncate';

const assert = chai.assert;

describe('total route', () => {
  beforeEach(async () => {
    await truncateAdvance();
    await truncateExpense();
  });

  it('should return totalFromMonth object with all property at 0', () => {
    const expected = {
      totalCommon: 0,
      nils: {
        expenses: 0,
        advances: 0,
        total: 0,
      },
      vio: {
        expenses: 0,
        advances: 0,
        total: 0,
      }
    };

    return request(app)
    .get('/total?year=2019&month=02')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      assert.deepEqual(res.body, expected);
    });
  });

  it('should return total with only February and only expenses', async () => {
    await Expense.create({
      date: '2019-02-01',
      description: 'courses',
      cost: 23,
      buyer: 'Vio',
    });
    await Expense.create({
      date: '2019-02-02',
      description: 'bk',
      cost: 15,
      buyer: 'Nils',
    });
    await Expense.create({
      date: '2019-02-03',
      description: 'courses',
      cost: 59,
      buyer: 'Vio',
    });
    await Expense.create({
      date: '2019-01-04',
      description: 'courses',
      cost: 43,
      buyer: 'Nils',
    });

    const expected = {
      'totalCommon': 97,
      'nils': {
        'expenses': 15,
        'advances': 0,
        'total': -33.5
      },
      'vio': {
        'expenses': 82,
        'advances': 0,
        'total': 33.5
      }
    };

    return request(app)
      .get('/total/?year=2019&month=02')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.deepEqual(res.body, expected);
      });
  });

  it('should return total with only February and only advances', async () => {
    await Advance.create({
      date: '2019-02-01',
      description: 'courses',
      cost: 23,
      buyer: 'Vio',
    });
    await Advance.create({
      date: '2019-02-02',
      description: 'bk',
      cost: 15,
      buyer: 'Nils',
    });
    await Advance.create({
      date: '2019-02-03',
      description: 'courses',
      cost: 59,
      buyer: 'Vio',
    });
    await Advance.create({
      date: '2019-01-04',
      description: 'courses',
      cost: 43,
      buyer: 'Nils',
    });

    const expected = {
      'totalCommon': 0,
      'nils': {
        'expenses': 0,
        'advances': 15,
        'total': -67
      },
      'vio': {
        'expenses': 0,
        'advances': 82,
        'total': 67
      }
    };

    return request(app)
      .get('/total/?year=2019&month=02')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.deepEqual(res.body, expected);
      });
  });

  it('should return total with only February expenses and advances', async () => {
    await Expense.create({
      date: '2019-02-01',
      description: 'courses',
      cost: 23,
      buyer: 'Vio',
    });
    await Expense.create({
      date: '2019-02-02',
      description: 'bk',
      cost: 15,
      buyer: 'Nils',
    });
    await Expense.create({
      date: '2019-02-03',
      description: 'courses',
      cost: 59,
      buyer: 'Vio',
    });
    await Advance.create({
      date: '2019-02-02',
      description: 'vélo',
      cost: 15,
      buyer: 'Nils',
    });
    await Advance.create({
      date: '2019-02-03',
      description: 'pain',
      cost: 7,
      buyer: 'Vio',
    });
    await Expense.create({
      date: '2019-01-04',
      description: 'courses',
      cost: 43,
      buyer: 'Nils',
    });
    await Advance.create({
      date: '2019-10-04',
      description: 'shorty',
      cost: 10,
      buyer: 'Nils',
    });

    const expected = {
      'totalCommon': 97,
      'nils': {
        'expenses': 15,
        'advances': 15,
        'total': -25.5
      },
      'vio': {
        'expenses': 82,
        'advances': 7,
        'total': 25.5
      }
    };

    return request(app)
      .get('/total/?year=2019&month=02')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.deepEqual(res.body, expected);
      });
  });
})

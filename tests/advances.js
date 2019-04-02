import request from 'supertest';
import chai from 'chai';
import chaiExclude from 'chai-exclude';

import app from '../api/app';
import { Advance } from '../../models';
import { truncateAdvance } from './truncate';

chai.use(chaiExclude);
const assert = chai.assert;

describe('Advance model', () => {
  beforeEach(async () => {
    await truncateAdvance();
  });

  it('should return empty advances list', () => {
    return request(app)
      .get('/advances?year=2019&month=02')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.isArray(res.body);
        assert.equal(res.body.length, 0);
      });
  });

  it('should add advance', () => {
    const advance = {
      date: '2019-02-12',
      description: 'courses',
      cost: 23,
      buyer: 'Vio',
    };
    const expected = { ...advance, id: 1 };

    return request(app)
      .post('/advances')
      .send(advance)
      .expect(201)
      .then(async (res) => {
        assert.deepEqualExcluding(res.body, expected, ['createdAt', 'updatedAt']);

        const advance = await Advance.findByPk(res.body.id);

        assert.deepEqualExcluding(advance.get(), expected, ['createdAt', 'updatedAt']);
      });
  });

  it('should update advance', async () => {
    const instance = await Advance.create({
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
      .put(`/advances/${instance.id}`)
      .send({ ...instance.get(), cost: 27 })
      .expect(200)
      .then(async (res) => {
        assert.deepEqualExcluding(res.body, expected, ['createdAt', 'updatedAt']);

        const updatedInstance = await Advance.findByPk(res.body.id);

        assert.deepEqualExcluding(updatedInstance.get(), expected, 'updatedAt');
      });
  });

  it('should delete advance', async () => {
    const instance = await Advance.create({
      date: '2019-02-12',
      description: 'courses',
      cost: 23,
      buyer: 'Vio',
    });

    return request(app)
      .delete(`/advances/${instance.id}`)
      .expect(204)
      .then(async (res) => {
        assert.isEmpty(res.body);

        const expected = await Advance.findByPk(instance.id);

        assert.isNull(expected);
      });
  });

  it('should return 02/2019 advances', async () => {
    const one = await Advance.create({
      date: '2019-02-01',
      description: 'courses',
      cost: 23,
      buyer: 'Vio',
    });
    const two = await Advance.create({
      date: '2019-02-02',
      description: 'bk',
      cost: 15,
      buyer: 'Nils',
    });
    const three = await Advance.create({
      date: '2019-02-03',
      description: 'courses',
      cost: 59,
      buyer: 'Vio',
    });
    const jan = await Advance.create({
      date: '2019-01-04',
      description: 'courses',
      cost: 43,
      buyer: 'Nils',
    });

    return request(app)
      .get('/advances/?year=2019&month=02')
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

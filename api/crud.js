import logger from './logger';
import { validationResult } from 'express-validator/check';
import Sequelize from 'sequelize';
import moment from 'moment';

const Op = Sequelize.Op;

const getById = async (req, res, next) => {
  try {
    const instance = await req.model.findByPk(req.params.id);

    if (!instance) {
      res.status(404).end(`${req.model} not found.`);
    } else {
      req.instance = instance;
      next();
    }
  } catch (e) {
    next(e);
  }
};

const getByMonth = async (req, res, next) => {
  try {
    const startOfMonth = moment([req.query.year, req.query.month - 1]);
    const endOfMonth = moment(startOfMonth).endOf('month');

    const instances = await req.model.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      order: ['date'],
    });

    return res.json(instances);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const instance = await req.model.create(req.body);

    if (req.model.getTableName() === 'Expenses') {
      logger('create expense', { id: instance.id })
        .catch(console.log);
    } else if (req.model.getTableName() === 'Advances') {
      logger('create advance', { id: instance.id })
        .catch(console.log);
    }

    return res.status(201).json(instance);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const instance = await req.instance.update(req.body);


    if (req.model.getTableName() === 'Expenses') {
      logger('update expense', { id: instance.id })
        .catch(console.log);
    } else if (req.model.getTableName() === 'Advances') {
      logger('update advance', { id: instance.id })
        .catch(console.log);
    }

    return res.json(instance);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    await req.instance.destroy();

    if (req.model.getTableName() === 'Expenses') {
      logger('remove expense', { id: req.instance.id })
        .catch(console.log);
    } else if (req.model.getTableName() === 'Advances') {
      logger('remove advance', { id: req.instance.id })
        .catch(console.log);
    }

    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getById,
  getByMonth,
  create,
  update,
  remove,
};

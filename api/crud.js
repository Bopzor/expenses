import logger from './logger';
import { validationResult } from 'express-validator/check';
import Sequelize from 'sequelize';

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
    const date = new Date(req.query.year, req.query.month - 1);

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 2);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

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

    logger(`Create ${req.baseUrl.slice(1, req.baseUrl.length - 1)} with ID`, instance.id)
      .catch(console.log);

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

    logger(`Update ${req.baseUrl.slice(1, req.baseUrl.length - 1)} with ID`, instance.id)
      .catch(console.log);

    return res.json(instance);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    await req.instance.destroy();

    logger(`Remove ${req.baseUrl.slice(1, req.baseUrl.length - 1)} with ID`, req.instance.id)
      .catch(console.log);

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

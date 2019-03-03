import { validationResult } from 'express-validator/check';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

const getById = async (req, res, next) => {
  try {
    const instance = await req.model.findByPk(req.params.id);

    if (!instance) {
      res.status(404).end('Instance not found');
    } else {
      req.instance = instance;
      next();
    }
  } catch (e) {
    next(e);
  }
};

const getMonth = async (req, res, next) => {
  try {
    let d = new Date();

    if (req.query.year && req.query.month) {
      d = new Date(req.query.year, req.query.month);
    }

    const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 2);
    const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1);

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

    return res.json(instance);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    await req.instance.destroy();

    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getById,
  getMonth,
  create,
  update,
  remove,
};

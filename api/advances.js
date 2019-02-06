import express from 'express';

import Sequelize from 'sequelize';
import { sequelize } from '../models';

import { validationResult } from 'express-validator/check';
import validate from './validate';

const router = express.Router();

const { Advance } = sequelize.models;
const Op = Sequelize.Op;


const getById = async (req, res, next) => {
  try {
    const advance = await Advance.findByPk(req.params.id);

    if (!advance) {
      res.status(404).end('Advance not found');

    } else {
      req.advance = advance;
      next();
    }

  } catch (e) {
    next(e)
  }
}

const getMonthAdvances = async (req, res, next) => {
  try {
    let d = new Date();

    if (req.query.year && req.query.month) {
      d = new Date(req.query.year, req.query.month)
    }

    const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 2);
    const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1);

    const advances = await Advance.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      order: ['date'],
    });

    return res.status(200).json(advances);

  } catch (e){
    next(e);
  }
};

const createAdvance = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const advance = await Advance.create(req.body);

    return res.status(201).json(advance);

  } catch (e) {
    next(e);
  }
};

const updateAdvance = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const advance = await req.advance.update(req.body);

    return res.status(200).json(advance);

  } catch (e) {
    next(e)
  }
};

const removeAdvance = async (req, res, next) => {
  try {
    await req.advance.destroy();

    return res.status(204).end();

  } catch (e){
    next(e);
  }
};

router.param('id', getById);

router.get('/', getMonthAdvances);

router.post('/', validate(), createAdvance);
router.put('/:id', validate(), updateAdvance);
router.delete('/:id', removeAdvance);

module.exports = router;

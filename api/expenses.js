import express from 'express';

import Sequelize from 'sequelize';
import { sequelize } from '../models';

const router = express.Router();

const { Expense } = sequelize.models;
const Op = Sequelize.Op;

const getById = async (req, res, next) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      res.status(404).end('Expense not found');

    } else {
      req.expense = expense;
      next();
    }

  } catch (e) {
    nexte(e)
  }
}

const getMonthExpenses = async (req, res, next) => {
  try {
    let d = new Date();

    if (req.query.month && req.query.year) {
      d = new Date(req.query.year, req.query.month);
    }

    const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 2);
    const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1);

    const expenses = await Expense.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      order: ['date'],
    });

    return res.status(200).json(expenses);

  } catch (e) {
    next(e);
  }
};

const createExpense = async (req, res, next) => {
  try {
    const expense = await Expense.create(req.body);

    return res.status(201).json(expense);

  } catch (e) {
    next(e);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const expense = await req.expense.update(req.body);

    return res.status(200).json(expense);

  } catch (e) {
    nexte()
  }
};

const removeExpense = async (req, res, next) => {
  try {
    await req.expense.destroy();

    return res.status(204).end();

  } catch (e) {
    next(e);
  }
};

router.param('id', getById);

router.get('/', getMonthExpenses);

router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', removeExpense);

module.exports = router;

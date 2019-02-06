import express from 'express';

import Sequelize from 'sequelize';
import { sequelize } from '../models';

const router = express.Router();

const { Expense, Advance } = sequelize.models;
const Op = Sequelize.Op;


const getTotal = async (req, res, next) => {
  try {
    let d = new Date();

    if (req.query.month && req.query.year) {
      d = new Date(req.query.year, req.query.month);
    }

    const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
    const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1);

    const totalExpensesNils = await Expense.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        buyer: 'Nils',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('cost')), 'expenses']]
    });

    const totalExpensesVio = await Expense.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        buyer: 'Vio',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('cost')), 'expenses']]
    });

    const totalAdvancesNils = await Advance.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        buyer: 'Nils',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('cost')), 'advances']]
    });

    const totalAdvancesVio = await Advance.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        buyer: 'Vio',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('cost')), 'advances']]
    });

    const total = {
      nils: [
        totalExpensesNils[0],
        totalAdvancesNils[0],
      ],
      vio: [
        totalExpensesVio[0],
        totalAdvancesVio[0],
      ]
    }

    return res.status(200).json(total);

  } catch (e) {
    next(e);
  }
}

router.get('/', getTotal);

module.exports = router;

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

    const totalExpensesCommon =await Expense.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('cost')), 'expenses']],
    });

    const totalExpensesNils = await Expense.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        buyer: 'Nils',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('cost')), 'expenses']],
    });

    const totalExpensesVio = await Expense.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        buyer: 'Vio',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('cost')), 'expenses']],
    });

    const totalAdvancesNils = await Advance.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        buyer: 'Nils',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('cost')), 'advances']],
    });

    const totalAdvancesVio = await Advance.findAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        buyer: 'Vio',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('cost')), 'advances']],
    });

    const calculateTotal = (sum, expenses, advancesSelf, advancesOther) => {
      return expenses - sum/2 + advancesSelf - advancesOther;
    }

    const totalFromMonth = {
      totalCommon: totalExpensesCommon[0].get('expenses'),
      nils: {
        expenses: totalExpensesNils[0].get('expenses'),
        advances: totalAdvancesNils[0].get('advances'),
        total: calculateTotal(
          totalExpensesCommon[0].get('expenses'),
          totalExpensesNils[0].get('expenses'),
          totalAdvancesNils[0].get('advances'),
          totalAdvancesVio[0].get('advances')
        ),
      },
      vio: {
        expenses: totalExpensesVio[0].get('expenses'),
        advances: totalAdvancesVio[0].get('advances'),
        total: calculateTotal(
          totalExpensesCommon[0].get('expenses'),
          totalExpensesVio[0].get('expenses'),
          totalAdvancesVio[0].get('advances'),
          totalAdvancesNils[0].get('advances'),
        ),
      },
    };

    return res.json(totalFromMonth);

  } catch (e) {
    next(e);
  }
}

router.get('/', getTotal);

module.exports = router;

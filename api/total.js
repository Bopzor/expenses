import express from 'express';

import Sequelize from 'sequelize';
import { sequelize } from '../../models';

const router = express.Router();

const { Expense, Advance } = sequelize.models;
const Op = Sequelize.Op;


const getTotal = async (req, res, next) => {
  try {
    const date = new Date(req.query.year, req.query.month - 1);

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 2);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    const totalExpensesCommon = await Expense.findAll({
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

    const calculateTotal = (sum = 0, expenses = 0, advancesSelf = 0, advancesOther = 0) => {
      return expenses - sum/2 + advancesSelf - advancesOther;
    }

    const parseStringNumberNullToFloat = (total) => {
      if (total === null)
        return 0;

      return parseFloat(total);
    };

    const totalFromMonth = {
      totalCommon: parseStringNumberNullToFloat(totalExpensesCommon[0].get('expenses')),
      nils: {
        expenses: parseStringNumberNullToFloat(totalExpensesNils[0].get('expenses')),
        advances: parseStringNumberNullToFloat(totalAdvancesNils[0].get('advances')),
        total: calculateTotal(
          parseStringNumberNullToFloat(totalExpensesCommon[0].get('expenses')),
          parseStringNumberNullToFloat(totalExpensesNils[0].get('expenses')),
          parseStringNumberNullToFloat(totalAdvancesNils[0].get('advances')),
          parseStringNumberNullToFloat(totalAdvancesVio[0].get('advances'))
        ),
      },
      vio: {
        expenses: parseStringNumberNullToFloat(totalExpensesVio[0].get('expenses')),
        advances: parseStringNumberNullToFloat(totalAdvancesVio[0].get('advances')),
        total: calculateTotal(
          parseStringNumberNullToFloat(totalExpensesCommon[0].get('expenses')),
          parseStringNumberNullToFloat(totalExpensesVio[0].get('expenses')),
          parseStringNumberNullToFloat(totalAdvancesVio[0].get('advances')),
          parseStringNumberNullToFloat(totalAdvancesNils[0].get('advances'))
        ),
      }
    };

    return res.json(totalFromMonth);

  } catch (e) {
    next(e);
  }
}

router.get('/', getTotal);

module.exports = router;

import express from 'express';

import Sequelize from 'sequelize';
import { sequelize } from '../../models';

import moment from 'moment';

const router = express.Router();

const { Expense, Advance } = sequelize.models;
const Op = Sequelize.Op;


const getTotalExpensesCommonByMonth = async (startOfMonth, endOfMonth) => {
  const totalCommon = await Expense.findAll({
    where: {
      date: {
      [Op.between]: [startOfMonth, endOfMonth],
      },
    },
    attributes: [[sequelize.fn('SUM', sequelize.col('cost')), 'expenses']],
  });

  return totalCommon[0].get('expenses');
}

const getMonthlyTotalExpensesByBuyer = async (buyer, startOfMonth, endOfMonth) => {
  const totalExpenses = await Expense.findAll({
    where: {
      date: {
        [Op.between]: [startOfMonth, endOfMonth],
      },
      buyer: buyer,
    },
    attributes: [[sequelize.fn('SUM', sequelize.col('cost')), 'expenses']],
  });

  return totalExpenses[0].get('expenses');
}

const getMonthlyTotalAdvancesByBuyer = async (buyer, startOfMonth, endOfMonth) => {
  const totalAdvances = await Advance.findAll({
    where: {
      date: {
        [Op.between]: [startOfMonth, endOfMonth],
      },
      buyer: buyer,
    },
    attributes: [[sequelize.fn('SUM', sequelize.col('cost')), 'advances']],
  });

  return totalAdvances[0].get('advances');
}

const calculateTotal = (sum = 0, expenses = 0, advancesSelf = 0, advancesOther = 0) => {
  return Math.round((expenses - sum/2 + advancesSelf - advancesOther) * 100) / 100;
}

const parseStringNumberNullToFloat = (total) => {
  if (total === null)
    return 0;

  return parseFloat(total);
};

const getTotalByMonth = async (req, res, next) => {
  try {
    const startOfMonth = moment([req.query.year, req.query.month - 1]);
    const endOfMonth = moment(startOfMonth).endOf('month');

    const totalExpensesCommon = parseStringNumberNullToFloat(
      await getTotalExpensesCommonByMonth(startOfMonth, endOfMonth)
    );

    const totalExpensesNils = parseStringNumberNullToFloat(
      await getMonthlyTotalExpensesByBuyer('Nils', startOfMonth, endOfMonth)
    );

    const totalAdvancesNils = parseStringNumberNullToFloat(
      await getMonthlyTotalAdvancesByBuyer('Nils', startOfMonth, endOfMonth)
    );

    const totalExpensesVio = parseStringNumberNullToFloat(
      await getMonthlyTotalExpensesByBuyer('Vio', startOfMonth, endOfMonth)
    );
    const totalAdvancesVio = parseStringNumberNullToFloat(
      await getMonthlyTotalAdvancesByBuyer('Vio', startOfMonth, endOfMonth)
    );


    const totalOfMonth = {
      totalCommon: totalExpensesCommon,
      nils: {
        expenses: totalExpensesNils,
        advances: totalAdvancesNils,
        total: calculateTotal(
          totalExpensesCommon,
          totalExpensesNils,
          totalAdvancesNils,
          totalAdvancesVio,
        ),
      },
      vio: {
        expenses: totalExpensesVio,
        advances: totalAdvancesVio,
        total: calculateTotal(
          totalExpensesCommon,
          totalExpensesVio,
          totalAdvancesVio,
          totalAdvancesNils,
        ),
      }
    };

    return res.json(totalOfMonth);

  } catch (e) {
    next(e);
  }
}

router.get('/', getTotalByMonth);

module.exports = router;

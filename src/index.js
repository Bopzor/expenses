import express from 'express';
import bodyParser from 'body-parser';

import { sequelize} from '../models';

const { Expense } = sequelize.models;

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getById = async (req, res, next) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      res.status(404).end('Expense not found');

    } else {
      req.expense = expense;
      next();
    }

  } catch {
    next()
  }
}

const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll({ order: ['when'] });

    return res.status(200).json(expenses);

  } catch {
    next();
  }
};

const createExpense = async (req, res, next) => {
  try {
    const expense = await Expense.create({ ...req.body, when: new Date() });

    return res.status(201).json(expense);

  } catch {
    next();
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const expense = await req.expense.update(req.body);

    return res.status(200).json(expense);

  } catch {
    next()
  }
};

const removeExpense = async (req, res, next) => {
  try {
    await req.expense.destroy();

    return res.status(204).end();

  } catch {
    next();
  }
};

app.param('id', getById);

app.get('/', getExpenses);
app.post('/', createExpense);
app.put('/:id', updateExpense);
app.delete('/:id', removeExpense);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

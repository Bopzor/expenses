import express from 'express';

import expenses from './expenses';
import advances from './advances';
import total from './total';

const api = express.Router();

api.use('/expenses', expenses);
api.use('/advances', advances);
api.use('/total', total);

module.exports = api;

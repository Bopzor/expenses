import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import expenses from './expenses';
import advances from './advances';
import total from './total';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use('/expenses', expenses);
app.use('/advances', advances);
app.use('/total', total);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).end(err.toString());
});

module.exports = app;
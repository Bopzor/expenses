import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import api from './api';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use('/api', api);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).end(err.toString());
});

module.exports = app;
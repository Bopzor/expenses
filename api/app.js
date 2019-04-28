import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import api from './api';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', req.get('origin'));
    res.set('Access-Control-Allow-Headers', 'content-type');
    res.set('Access-Control-Allow-Methods', 'DELETE');

    next();
  });
}

app.use('/api', api);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).end(err.toString());
});

module.exports = app;
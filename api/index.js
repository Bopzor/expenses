import express from 'express';
import bodyParser from 'body-parser';

import expenses from './expenses';
import advances from './advances';

import { sequelize} from '../models';

const PORT = process.env.PORT || 4242;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.sequelize = sequelize;
  next();
});

app.use('/expenses', expenses);
app.use('/advances', advances);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).end(err.toString());
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

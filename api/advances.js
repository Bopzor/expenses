import express from 'express';

import { sequelize } from '../../models';

import validate from './validate';
import { getById, getByMonth, create, update, remove } from './crud';

const router = express.Router();

const { Advance } = sequelize.models;

router.use((req, res, next) => {
  req.model = Advance;
  next();
})

router.param('id', getById);

router.get('/', getByMonth);

router.post('/', validate(), create);
router.put('/:id', validate(), update);
router.delete('/:id', remove);

module.exports = router;

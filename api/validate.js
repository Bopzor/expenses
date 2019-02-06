import { check } from 'express-validator/check';

const validate = () => {
  return [
    check('description', 'This field is required').exists(),
    check('cost', 'This field is required').exists(),
    check('cost', 'This field must be an integer').isInt(),
    check('buyer', 'This field is required').exists(),
    check('buyer', 'This field must be Nils or Vio').isIn(['Nils', 'Vio']),
    check('date', 'This field must be a date').exists(),
    check('date', 'This field must be a date').isISO8601(),
  ]
}

module.exports = validate;
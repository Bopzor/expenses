import { check } from 'express-validator/check';

const validate = () => {
  return [
    check('description').exists().withMessage('This field is required'),
    check('cost')
      .exists().withMessage('This field is required')
      .isNumeric().withMessage('This field must be a number'),
    check('buyer')
      .exists().withMessage('This field is required')
      .isIn(['Nils', 'Vio']).withMessage('This field must be Nils or Vio'),
    check('date')
      .exists().withMessage('This field is required')
      .isISO8601().withMessage('This field must be a date'),
  ]
}

const formatErrors = ({ msg, value  }) => {
  return {
    message: msg,
    value,
  };
};

module.exports = { validate, formatErrors };

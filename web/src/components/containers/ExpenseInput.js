import { connect } from 'react-redux';
import { createExpense, editExpense, validateExpense, validateField } from '../../redux/actions';

import { PayementItemInput } from '../presentationals/PayementItemInput';

const mapsStateToProps = state => ({
  isSubmitting: state.expenses.addingExpense,
  errors: state.expenses.errors,
});

const mapDispatchToProps = dispatch => ({
  createPayementItem: body => dispatch(createExpense(body)),
  editPayementItem: body => dispatch(editExpense(body)),
  validatePayementItem: body => dispatch(validateExpense(body)),
  validateField: body => dispatch(validateField(body)),
});

export const ExpenseInput = connect(mapsStateToProps, mapDispatchToProps)(PayementItemInput);

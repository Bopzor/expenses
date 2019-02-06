import { connect } from 'react-redux';
import { createExpense, editExpense } from '../../redux/actions';

import PayementItemInput from '../presentationals/payementItemInput';

const mapsStateToProps = state => ({
  isSubmitting: state.expenses.addingExpense,
});

const mapDispatchToProps = dispatch => ({
  createPayementItem: body => dispatch(createExpense(body)),
  editPayementItem: body => dispatch(editExpense(body)),
});

const ExpenseInput = connect(mapsStateToProps, mapDispatchToProps)(PayementItemInput);

export default ExpenseInput;
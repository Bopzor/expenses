import { connect } from 'react-redux';
import { fetchExpenses, deleteExpense } from '../../redux/actions';

import { PayementsList } from '../presentationals/payementsList';

const mapStateToProps = state => ({
  payementItems: state.expenses.list,
  fetching: state.expenses.fetchingExpenses,
  error: state.expenses.error,
});

const mapDispatchToProps = dispatch => ({
  fetchPayementItems: (year, month) => dispatch(fetchExpenses(year, month)),
  deletePayementItem: expense => dispatch(deleteExpense(expense)),
});

export const ExpensesList = connect(mapStateToProps, mapDispatchToProps)(PayementsList);

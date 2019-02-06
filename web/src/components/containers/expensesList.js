import { connect } from 'react-redux';
import { fetchExpenses, deleteExpense } from '../../redux/actions';

import PayementsList from '../presentationals/payementsList';

const mapStateToProps = state => ({
  payementItems: state.expenses.list,
  fetching: state.expenses.fetchingExpenses,
  error: state.expenses.error,
});

const mapDispatchToProps = dispatch => ({
  fetchPayementItems: (dateFilter = undefined) => dispatch(fetchExpenses(dateFilter)),
  deletePayementItem: id => dispatch(deleteExpense(id)),
});

const ExpensesList = connect(mapStateToProps, mapDispatchToProps)(PayementsList);

export default ExpensesList;

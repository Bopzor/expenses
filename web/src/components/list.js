import React from 'react';

import { connect } from 'react-redux';
import { fetchExpenses, deleteExpense } from '../redux/actions';

import { Row, Col, NavLink } from 'reactstrap';

import Expense from './expense';

class List extends React.Component {
  componentDidMount() {
    this.props.fetchExpenses();
  }

  renderExpense(expense) {
    return (
      <Expense
        key={`key-${expense.id}`}
        expense={expense}
        removeExpense={id => this.props.deleteExpense(id)}
      />
    );
  }

  render() {
    const { error, fetchingExpenses, expenses } = this.props;

    if (error) {
      return <p>Error! {error.message}</p>;
    }

    if (fetchingExpenses) {
      return <p>Loading...</p>;
    }

    if (!expenses)
      return null;

    return <div>
        <Row>
          <Col>
            <NavLink href="/">Add new expense</NavLink>
          </Col>
        </Row>
        {expenses.map(e => this.renderExpense(e))}
      </div>;
  }
}

const mapStateToProps = state => ({
  expenses: state.expenses,
  fetchingExpenses: state.fetchingExpenses,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  fetchExpenses: () => dispatch(fetchExpenses()),
  deleteExpense: id => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
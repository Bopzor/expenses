import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { ExpenseInput } from './containers/expenseInput';
import { Header } from './header';
import { Total } from './containers/total';

class ExpensePage extends Component {
  state = {
    expense: this.props.expenses.filter(e => e.id === parseInt(this.props.id))[0],
  }

  render() {
    const { expense } = this.state;

    return (
      <div>
        <Header year={moment(expense.date).format('YYYY')} month={moment(expense.date).format('MM')} />

        <ExpenseInput payementType="expense" payementItem={expense} />

        <Total
          className="fixed-bottom"
          year={moment(expense.date).format('YYYY')}
          month={moment(expense.date).format('MM')}
        />
      </div>
    );

  }
};

const mapStateToProps = state => ({
  expenses: state.expenses.list,
});

export default connect(mapStateToProps)(ExpensePage);

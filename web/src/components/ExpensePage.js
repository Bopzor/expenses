import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { ExpenseInput } from './containers/ExpenseInput';
import { Header } from './Header';
import { Total } from './containers/Total';

class ExpensePage extends Component {
  state = {
    expense: this.props.expenses.filter(e => e.id === parseInt(this.props.id))[0],
  }

  render() {
    const { expense } = this.state;
    const year = moment(expense.date).format('YYYY');
    const month = moment(expense.date).format('MM');

    return (
      <div>
        <Header year={year} month={month} />

        <ExpenseInput payementType="expense" payementItem={expense} />

        <Total year={year} month={month} />
      </div>
    );

  }
};

const mapStateToProps = state => ({
  expenses: state.expenses.list,
});

export default connect(mapStateToProps)(ExpensePage);

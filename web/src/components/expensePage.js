import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExpenseInput from './containers/expenseInput';
import Header from './header';

class ExpensePage extends Component {
  state = {
    expense: this.props.expenses.filter(e => e.id == this.props.id)[0],
  }

  render() {
    const { expense } = this.state;

    return (
      <div>
        <Header date={new Date()} changeDate={date => this.props.changeDate(date)} />

        <ExpenseInput payementType="expense" payementItem={expense} />
      </div>
    );

  }
};

const mapStateToProps = state => ({
  expenses: state.expenses.list,
});

export default connect(mapStateToProps)(ExpensePage);

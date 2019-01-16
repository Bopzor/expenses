import React, { Component} from 'react';

import InputExpense from './inputExpense';

import { Row, Col, Button } from 'reactstrap';

import './expense.css';

class Expense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    }
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing });
  }

  edited() {
    this.setState({
      editing: false,
    });
  }

  render() {
    const { expense, removeExpense } = this.props;
    const { editing } = this.state;

    if (!editing) {
      return (
        <Row onClick={() => this.toggleEditing()} className={expense.buyer.toLowerCase()}>
          <Col>{new Date(expense.date).getDate()}</Col>
          <Col xs="6">{expense.description}</Col>
          <Col>{expense.cost}</Col>
          <Col><Button close onClick={() => removeExpense(expense.id)} /></Col>
        </Row>
      );
    }

    return (
      <Row onClick={() => this.toggleEditing()}>
        <InputExpense expense={expense} onEditingFinish={() => this.edited()} />
      </Row>
    )
  }
}

export default Expense;
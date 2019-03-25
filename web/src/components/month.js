import React, { Component } from 'react';

import { Route, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import { Table } from 'reactstrap';

import ExpensesList from './containers/expensesList';
import AdvancesList from './containers/advancesList';

import Header from './header';

import './month.css';

class Month extends Component {
  render() {
    const navPaths = [
      {
        pathname: "Expenses",
        path: "/month"
      },
      {
        pathname: "Advances",
        path: "/month/advances"
      },
    ];

    return (
      <div>
        <Header date={this.props.dateFilter} navPaths={navPaths} changeDate={date => this.props.changeDate(date)} />
        <Table size="sm" responsive>

          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Cost</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <Switch>
            <Route path="/month/advances" render={
              props => <AdvancesList payementType="advance" dateFilter={this.props.dateFilter} />
            } />
            <Route path="/month" render={
              props => <ExpensesList payementType="expense" dateFilter={this.props.dateFilter} />
            } />
          </Switch>

        </Table>

      </div>
    );
  }
}

Month.propTypes = {
  date: PropTypes.instanceOf(Date),
  changeDate: PropTypes.func.isRequired,
}

export default Month;

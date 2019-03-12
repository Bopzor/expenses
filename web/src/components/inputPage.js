import React from 'react';

import { Route, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import ExpenseInput from './containers/expenseInput';
import AdvanceInput from './containers/advanceInput';
import Header from './header';

const InputPage = (props) => {
  const navPaths = [
    {
      pathname: "Expense",
      path: "/"
    },
    {
      pathname: "Advance",
      path: "/advance"
    },
  ];

  return (
    <div>

      <Header date={props.dateFilter} navPaths={navPaths} changeDate={date => props.changeDate(date)} />

      <Switch>
        <Route path="/advance" render={
          routeProps => <AdvanceInput payementType="advance" date={props.dateFilter} />
        } />
        <Route exact path="/" render={
          routeProps => <ExpenseInput payementType="expense" date={props.dateFilter} />
        } />
      </Switch>

    </div>
  );
};

InputPage.propTypes = {
  date: PropTypes.instanceOf(Date),
  changeDate: PropTypes.func.isRequired,
};


export default InputPage;

import React from 'react';
import { Route, Switch } from "react-router-dom";

import { ExpenseInput } from './containers/expenseInput';
import { AdvanceInput } from './containers/advanceInput';
import { Header } from './header';
import { Total } from './containers/total';

export const InputPage = ({ year, month }) => {
  const navPaths = [
    {
      pathname: 'Expense',
      path: `/add/${year}/${month}/expense`,
    },
    {
      pathname: 'Advance',
      path: `/add/${year}/${month}/advance`,
    },
  ];

  return (
    <div>
      <Header navPaths={navPaths} year={year} month={month} />

      <Switch>
        <Route path={navPaths[0].path} render={
          props => <ExpenseInput payementType="expense" />
        } />
        <Route path={navPaths[1].path} render={
          props => <AdvanceInput payementType="advance" />
        } />
      </Switch>

      <Total className="fixed-bottom" year={year} month={month} />
    </div>
  );
};

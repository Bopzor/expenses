import React, { useState } from 'react';
import { Route, Switch } from "react-router-dom";

import { ExpenseInput } from './containers/ExpenseInput';
import { AdvanceInput } from './containers/AdvanceInput';
import { Header } from './Header';
import { Total } from './containers/Total';

export const InputPage = ({ year, month }) => {
  const [displayTotal, setDisplayTotal] = useState(true);
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

  const handleInputBlur = () => {
    setDisplayTotal(true);
  }

  const handleInputFocus = () => {
    setDisplayTotal(false);
  }

  return (
    <div>
      <Header navPaths={navPaths} year={year} month={month} />

      <Switch>
        <Route path={navPaths[0].path} render={
          props => <ExpenseInput
            payementType="expense"
            onInputFocus={() => handleInputFocus()}
            onInputBlur={() => handleInputBlur()}
          />
        } />
        <Route path={navPaths[1].path} render={
          props => <AdvanceInput
            payementType="advance"
            onInputFocus={() => handleInputFocus()}
            onInputBlur={() => handleInputBlur()}
          />
        } />
      </Switch>

      { displayTotal && <Total year={year} month={month} /> }
    </div>
  );
};

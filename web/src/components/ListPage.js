import React from 'react';
import { NavLink } from 'react-router-dom';

import { ExpensesList } from './containers/ExpensesList';
import { AdvancesList } from './containers/AdvancesList';
import { Header } from './Header';
import { Total } from './containers/Total';

import './ListPage.css';

export const ListPage = ({ year, month, payementType }) => {
  const navPaths = [
    {
      pathname: 'Expenses',
      path: `/list/expenses/${year}/${month}`
    },
    {
      pathname: 'Advances',
      path: `/list/advances/${year}/${month}`
    },
  ];

  const inputPath =  `/add/${year}/${month}/${payementType}`;

  return (
    <div className="flex-container">
      <Header navPaths={navPaths} year={year} month={month} />

      <div className="payement-list-table flex-1">
        <table>

          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Cost</th>
              <th scope="col"></th>
            </tr>
          </thead>

          { payementType === 'expense'
            ? <ExpensesList payementType={payementType} year={year} month={month} />
            : <AdvancesList payementType={payementType} year={year} month={month} />
          }

        </table>
      </div>

      <NavLink className="add-payement" exact to={inputPath}>Add new {payementType}</NavLink>

      <Total year={year} month={month} />

    </div>
  );
}

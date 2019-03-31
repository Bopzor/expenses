import React from 'react';
import { Table } from 'reactstrap';

import { ExpensesList } from './containers/expensesList';
import { AdvancesList } from './containers/advancesList';
import { Header } from './header';
import { Total } from './containers/total';

import './month.css';

export const Month = ({ year, month, payementType }) => {
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

  if(payementType === 'expense') {
    return (
      <div>
        <Header navPaths={navPaths} year={year} month={month} />
        <Table size="sm" responsive>

          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Cost</th>
              <th scope="col"></th>
            </tr>
          </thead>
            <ExpensesList payementType={payementType} year={year} month={month} />

        </Table>

        <Total className="fixed-bottom" year={year} month={month} />
      </div>
    );
  }

  return (
    <div>
      <Header navPaths={navPaths} year={year} month={month} />
      <Table size="sm" responsive>

        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Cost</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <AdvancesList payementType={payementType} year={year} month={month} />

      </Table>

      <Total className="fixed-bottom" year={year} month={month} />
    </div>
  );
}

import React from 'react';
import { Table } from 'reactstrap';

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

        { payementType === 'expense'
          ? <ExpensesList payementType={payementType} year={year} month={month} />
          : <AdvancesList payementType={payementType} year={year} month={month} />
        }

      </Table>

      <Total className="fixed-bottom" year={year} month={month} />
    </div>
  );
}

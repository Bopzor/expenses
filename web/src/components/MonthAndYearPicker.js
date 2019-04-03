import React, { useState } from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

import './MonthAndYearPicker.css';

export const MonthAndYearPicker = ({ year, closeModal }) => {
  const [selectedYear, setSelectedYear] = useState(year);
  const currentYear = moment().format('YYYY');
  const prevYear = moment().subtract(1, 'y').format('YYYY');

  const renderMonth = (monthName) => {
    const selectedMonthNumber = moment().month(monthName, 'MMMM').format('MM');
    return (
      <NavLink
        to={`/list/expenses/${selectedYear}/${selectedMonthNumber}`}
        key={selectedMonthNumber}
        onClick={() => closeModal()}
      >
        { monthName }
      </NavLink>
    );
  };

  return (
    <div className="month-year-picker">

      <div className="year">
        <div
          className={ prevYear === selectedYear ? 'selected' : '' }
          onClick={() => setSelectedYear(prevYear)}
        >
          { prevYear }
        </div>

        <div
          className={ currentYear === selectedYear ? 'selected' : '' }
          onClick={() => setSelectedYear(currentYear)}
        >
          { currentYear }
        </div>
      </div>

      <div className="month">
        { moment.months().map(m => renderMonth(m)) }
      </div>

    </div>
  );
};

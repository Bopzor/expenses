import React, { useState } from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

import './monthAndYearPicker.css';

export const MonthAndYearPicker = ({ year, closeModal }) => {
  const [selectedYear, setSelectedYear] = useState(year);

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
          className={ moment().subtract(1, 'y').format('YYYY') === selectedYear ? 'current' : '' }
          onClick={() => setSelectedYear(moment().subtract(1, 'y').format('YYYY'))}
        >
          { moment().subtract(1, 'y').format('YYYY') }
        </div>
        <div
          className={ moment().format('YYYY') === selectedYear ? 'current' : '' }
          onClick={() => setSelectedYear(moment().format('YYYY'))}
        >
          { moment().format('YYYY') }
        </div>
      </div>

      <div className="month">
        { moment.months().map(m => renderMonth(m)) }
      </div>
    </div>
  );
};

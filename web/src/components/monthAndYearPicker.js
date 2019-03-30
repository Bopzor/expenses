import React, { useState } from 'react';
import moment from 'moment';

import './monthAndYearPicker.css';

export const MonthAndYearPicker = (props) => {
  const { date, changeDate } = props;
  const [monthNumber, setMonthNumber] = useState(moment(date, 'MM-YYYY').format('MM'));
  const [year, setYear] = useState(moment(date, 'MM-YYYY').format('YYYY'));

  const onSelectMonth = (selectedMonthNumber) => {
    setMonthNumber(selectedMonthNumber);
    changeDate(selectedMonthNumber, year);
  }

  const onSelectYear = (selectedYear) => {
    setYear(selectedYear);
    changeDate(monthNumber, selectedYear);
  }

  const renderMonth = (month) => {
    const selectedMonthNumber = moment().month(month, 'MMMM').format('MM');
    return (
      <div
        key={selectedMonthNumber}
        className={ selectedMonthNumber === monthNumber ? 'current' : '' }
        onClick={() => onSelectMonth(selectedMonthNumber)}
      >
        { month }
      </div>
    );
  };

  return (
    <div className="month-year-picker">
      <div className="year">
        <div
          className={ moment().subtract(1, 'y').format('YYYY') === year ? 'current' : '' }
          onClick={() => onSelectYear(moment().subtract(1, 'y').format('YYYY'))}
        >
          { moment().subtract(1, 'y').format('YYYY') }
        </div>
        <div
          className={ moment().format('YYYY') === year ? 'current' : '' }
          onClick={() => onSelectYear(moment().format('YYYY'))}
        >
          { moment().format('YYYY') }
        </div>
      </div>

      <div className="month">
        { moment.months().map(month => renderMonth(month)) }
      </div>
    </div>
  );

};

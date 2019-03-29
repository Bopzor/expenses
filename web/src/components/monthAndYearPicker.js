import React, { useState, useEffect } from 'react';
import moment from 'moment';

import './monthAndYearPicker.css';

export const MonthAndYearPicker = (props) => {
  const { date, onChangeDate } = props;
  const [monthNumber, setMonthNumber] = useState(moment(date, 'MM-YYYY').format('MM'));
  const [year, setYear] = useState(moment(date, 'MM-YYYY').format('YYYY'));

  useEffect(() => {
    if (moment(`${monthNumber}-${year}`, 'MM-YYYY') !== date)
      onChangeDate(monthNumber, year);
  });

  const renderMonth = (month) => {
    const selectedMonthNumber = moment().month(month, 'MMMM').format('MM');
    return (
      <div
        key={selectedMonthNumber}
        className={ selectedMonthNumber === monthNumber ? 'current' : '' }
        onClick={() => setMonthNumber(selectedMonthNumber)}
      >
        { month }
      </div>
    );
  };

  return (
    <div className="month-year-picker">
      <div className="year">
        <div
          className={ moment().format('YYYY') - 1 === year ? 'current' : '' }
          onClick={() => setYear(moment(date, 'MM-YYYY').format('YYYY') - 1)}
        >
          { moment().format('YYYY') - 1 }
        </div>
        <div
          className={ moment().format('YYYY') === year ? 'current' : '' }
          onClick={() => setYear(moment(date, 'MM-YYYY').format('YYYY'))}
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

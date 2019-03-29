import React, { useState, useEffect } from 'react';
import moment from 'moment';
import localization from 'moment/locale/fr'

import './monthAndYearPicker.css';

moment.locale('fr');

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
    <div>
      { moment.months().map(month => renderMonth(month)) }
    </div>
  );

};

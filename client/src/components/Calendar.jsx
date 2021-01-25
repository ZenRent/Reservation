import React from 'react';
import PropTypes from 'prop-types';
import Month from './Month';
import dateComp from '../utils/dateComputation';
import styles from './styles/Calendar.css';

const Calendar = ({ scrollPosition, calendarUTCDates/* , bookedDates */ }) => {
  // console.log(bookedDates);
  const months = [];
  const nextMonth = new Date();
  nextMonth.setDate(1);
  for (let i = 0; i < 38; i += 1) {
    const monthUTCDates = dateComp.getMonthUTCDates(nextMonth, calendarUTCDates);
    months.push(
      <div key={nextMonth.toUTCString()} className={styles.monthContainer}>
        <Month
          monthDate={new Date(nextMonth)}
          monthUTCDates={monthUTCDates}
          // bookedDates={bookedDates}
        />
      </div>,
    );
    nextMonth.setMonth(nextMonth.getMonth() + 1);
  }
  const root = document.querySelector(':root');
  root.style.setProperty('--scroll-position', scrollPosition);

  return (
    <div className={styles.monthRowContainer}>
      <div className={styles.monthRow}>
        {months}
      </div>
    </div>
  );
};

export default Calendar;

Calendar.propTypes = {
  scrollPosition: PropTypes.number.isRequired,
  // bookedDates: PropTypes.arrayOf(PropTypes.object).isRequired,
  calendarUTCDates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

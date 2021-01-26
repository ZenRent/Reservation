import React from 'react';
import PropTypes from 'prop-types';
import Month from './Month';
import dateComp from '../utils/dateComputation';
import styles from './styles/Calendar.css';

const Calendar = ({
  scrollPosition,
  calendarUTCDates,
  checkInDate,
  checkOutDate,
  onClickDate,
  minNights,
}) => {
  const months = [];
  const nextMonth = new Date();
  nextMonth.setDate(1);
  for (let i = 0; i < 38; i += 1) {
    const monthUTCDates = dateComp.getMonthUTCDatesWithStatus(
      nextMonth,
      calendarUTCDates,
      checkInDate,
      checkOutDate,
      minNights,
    );
    months.push(
      <div key={nextMonth.toUTCString()} className={styles.monthContainer}>
        <Month
          monthDate={new Date(nextMonth)}
          monthUTCDates={monthUTCDates}
          onClickDate={onClickDate}
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
  calendarUTCDates: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkInDate: PropTypes.string.isRequired,
  checkOutDate: PropTypes.string.isRequired,
  onClickDate: PropTypes.func.isRequired,
  minNights: PropTypes.number.isRequired,
};

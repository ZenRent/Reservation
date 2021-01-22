import React from 'react';
import PropTypes from 'prop-types';
import Month from './Month';
import styles from './styles/Calendar.css';

const Calendar = ({ scrollPosition }) => {
  const months = [];
  const nextMonth = new Date();
  nextMonth.setDate(1);
  for (let i = 0; i < 38; i += 1) {
    months.push(
      <div key={nextMonth} className={styles.monthContainer}>
        <Month monthDate={new Date(nextMonth)} />
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
};

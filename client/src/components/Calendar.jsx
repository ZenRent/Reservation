import React from 'react';
import Month from './Month';
import Week from './Week';
import styles from './styles/Calendar.css';

const Calendar = (props) => {
  const months = [];
  const nextMonth = new Date();
  nextMonth.setDate(1);
  for (let i = 0; i < 37; i += 1) {
    months.push(
      <div key={nextMonth} className={styles.monthContainer}>
        <Month monthDate={new Date(nextMonth)} />
      </div>,
    );
    nextMonth.setMonth(nextMonth.getMonth() + 1);
  }

  return (
    <div className={styles.monthRow}>
      {months}
    </div>
  );
};

export default Calendar;

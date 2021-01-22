import React from 'react';
import styles from './styles/Day.css';

const Day = ({ day }) => {
  let dayDisplay;
  if (typeof day === 'string' && day.length === 2) {
    dayDisplay = day;
  } else {
    dayDisplay = day === ''
      ? ''
      : day.getDate();
  }

  return (
    <div className={styles.dayBlock}>
      {dayDisplay}
    </div>
  );
};

export default Day;

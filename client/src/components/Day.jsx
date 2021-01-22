import React from 'react';
import styles from './styles/Day.css';

const Day = ({ day }) => {
  const dayDisplay = day === ''
    ? ''
    : day.getDate();

  return (
    <div className={styles.dayBlock}>
      {/* <h6>
        Day component
      </h6> */}
      {dayDisplay}
    </div>
  );
};

export default Day;

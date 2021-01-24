import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/Day.css';

const Day = ({ day }) => {
  let dayDisplay;
  if (typeof day === 'string' && day.length === 2) {
    dayDisplay = (
      <div className={styles.dayLabelBlock}>
        {day}
      </div>
    );
  } else {
    dayDisplay = day === ''
      ? (
        <div className={styles.dayBlock}>
          {' '}
        </div>
      )
      : (
        <div className={styles.dayBlock}>
          {day.getDate()}
        </div>
      );
  }

  return (
    // <div className={styles.dayBlock}>
      // {dayDisplay}
      dayDisplay
    // </div>
  );
};

export default Day;

Day.propTypes = {
  day: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
};

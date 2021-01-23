import React from 'react';
import PropTypes from 'prop-types';
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

Day.propTypes = {
  day: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
};

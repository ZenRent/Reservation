import React from 'react';
import PropTypes from 'prop-types';
import dateComp from '../utils/dateComputation';
import styles from './styles/Day.css';

const Day = ({ day }) => {
  // console.log(bookedDates);
  let dayDisplay;
  if (day === '') {
    dayDisplay = (
      <div className={styles.emptyDayBlock}>
        {' '}
      </div>
    );
  } else if (typeof day === 'string' && day.length === 2) {
    dayDisplay = (
      <div className={styles.dayLabelBlock}>
        {day}
      </div>
    );
  } else {
    const date = new Date(day.date);
    if (dateComp.isBeforeTomorrow(date)) {
      dayDisplay = (
        <div className={styles.pastDayBlock}>
          {/* {day.date.getDate()} */}
          {date.getDate()}
        </div>
      );
    } else if (day.isBooked) {
      dayDisplay = (
        <div className={styles.alreadyBookedDayBlock}>
          {/* {day.date.getDate()} */}
          {date.getDate()}
        </div>
      );
    } else {
      dayDisplay = (
        <div className={styles.dayBlock}>
          {/* {day.date.getDate()} */}
          {date.getDate()}
        </div>
      );
    }
  }

  return (
    dayDisplay
  );
};

export default Day;

Day.propTypes = {
  // day: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  day: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  // bookedDates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import dateComp from '../utils/dateComputation';
import styles from './styles/Day.css';

const Day = ({
  day,
  onClickDate,
}) => {
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
          {date.getDate()}
        </div>
      );
    } else if (day.isBooked) {
      dayDisplay = (
        <div className={styles.alreadyBookedDayBlock}>
          {date.getDate()}
        </div>
      );
    } else if (day.status === 'beforeCheckInDate') {
      dayDisplay = (
        <div className={styles.pastDayBlock}>
          {date.getDate()}
        </div>
      );
    } else if (day.status === 'checkInDateOnly') {
      dayDisplay = (
        <div className={styles.checkInDayBlock}>
          {date.getDate()}
        </div>
      );
    } else if (day.status === 'checkInDateWithDateRange') {
      dayDisplay = (
        <div>
          <div className={styles.checkInDayBlockBackground} />
          <div className={styles.checkInDayBlock}>
            {date.getDate()}
          </div>
        </div>
      );
    } else if (day.status === 'checkOutDate') {
      dayDisplay = (
        <div>
          <div className={styles.checkOutDayBlockBackground} />
          <div className={styles.checkOutDayBlock}>
            {date.getDate()}
          </div>
        </div>
      );
    } else if (day.status === 'inBetweenDate') {
      dayDisplay = (
        <div>
          <div className={styles.inBetweenDayBlockBackground} />
          <div className={styles.inBetweenDayBlock}>
            {date.getDate()}
          </div>
        </div>
      );
    } else {
      dayDisplay = (
        <div
          className={styles.dayBlock}
          onClick={() => onClickDate(date)}
        >
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
  day: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onClickDate: PropTypes.func.isRequired,
};

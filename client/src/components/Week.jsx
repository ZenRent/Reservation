import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import styles from './styles/Week.css';

const Week = ({ week }) => {
  // console.log(bookedDates);
  let number = -1;
  const days = week.map((day) => {
    number += 1;
    return (
      <Day
        key={JSON.stringify(day) + number}
        // key={day.date + number}
        // key={day + number}
        // key={number}
        day={day}
        // bookedDates={bookedDates}
      />
    );
  });

  return (
    <div className={styles.weekRow}>
      {days}
    </div>
  );
};

export default Week;

Week.propTypes = {
  week: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    // PropTypes.instanceOf(Date),
    PropTypes.object,
  ])).isRequired,
  // bookedDates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import styles from './styles/Week.css';

const Week = ({
  week,
}) => {
  let number = -1;
  const days = week.map((day) => {
    number += 1;
    return (
      <Day
        key={JSON.stringify(day) + number}
        day={day}
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
    PropTypes.object,
  ])).isRequired,
};

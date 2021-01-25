import React from 'react';
import PropTypes from 'prop-types';
import Week from './Week';
import dateComp from '../utils/dateComputation';
import styles from './styles/Month.css';

const Month = ({ monthDate/* , bookedDates */ }) => {
  const monthAndYear = monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  // const weeksAndDays = dateComp.getWeeksAndDays(monthDate, bookedDates);
  const weeksAndDays = dateComp.getWeeksAndDays(monthDate);
  const weeks = weeksAndDays.map((week) => (
    <Week
      key={week}
      week={week}
      // bookedDates={bookedDates}
    />
  ));

  return (
    <div className={styles.monthBlock}>
      <div className={styles.monthAndYearHeader}>
        {monthAndYear}
      </div>
      <div className={styles.weeks}>
        {weeks}
      </div>
    </div>
  );
};

export default Month;

Month.propTypes = {
  monthDate: PropTypes.instanceOf(Date).isRequired,
  // bookedDates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import Week from './Week';
import dateComp from '../utils/dateComputation';
import styles from './styles/Month.css';

const Month = ({ monthDate }) => {
  if (monthDate === undefined) { console.log('monthDate is undefined'); }
  const monthAndYear = monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const weeksAndDays = dateComp.getWeeksAndDays(monthDate);
  const weeks = weeksAndDays.map((week) => <Week key={week} week={week} />);

  return (
    <div className={styles.monthBlock}>
      <h4 className={styles.monthAndYearHeader}>
        {monthAndYear}
      </h4>
      {weeks}
    </div>
  );
};

export default Month;

Month.propTypes = {
  monthDate: PropTypes.instanceOf(Date).isRequired,
};

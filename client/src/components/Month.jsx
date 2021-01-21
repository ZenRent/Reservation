import React from 'react';
import Week from './Week';
import dateComp from '../utils/dateComputation';

const Month = ({ monthDate }) => {
  const monthAndYear = monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const weeksAndDays = dateComp.getWeeksAndDays(monthDate);

  return (
    <div>
      <h4>
        {monthAndYear}
      </h4>
      <Week />
    </div>
  );
};

export default Month;

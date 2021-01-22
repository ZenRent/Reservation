import React from 'react';
import Week from './Week';
import dateComp from '../utils/dateComputation';

const Month = ({ monthDate }) => {
  const monthAndYear = monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const weeksAndDays = dateComp.getWeeksAndDays(monthDate);
  const weeks = weeksAndDays.map((week) => <Week key={week} week={week} />);

  return (
    <div>
      <h4>
        {monthAndYear}
      </h4>
      {/* <Week /> */}
      {weeks}
    </div>
  );
};

export default Month;

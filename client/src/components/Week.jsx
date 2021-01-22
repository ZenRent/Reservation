import React from 'react';
import Day from './Day';

const Week = ({ week }) => {
  const days = week.map((day, key) => <Day key={day + key} day={day} />);

  return (
    <div>
      {/* <h5>
        Week component
      </h5> */}
      {/* <Day /> */}
      {days}
    </div>
  );
};

export default Week;

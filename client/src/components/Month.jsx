import React from 'react';
import Week from './Week';

const Month = ({ month }) => {
  const monthAndYear = month.toLocaleString('en-US', { month: 'long', year: 'numeric' });
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

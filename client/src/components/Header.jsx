import React from 'react';
import PropTypes from 'prop-types';
import dateComp from '../utils/dateComputation';
import styles from './styles/Header.css';

const Header = (props) => {
  const {
    nightlyRate,
    averageRating,
    reviewCount,
    bookedDates,
  } = props;
  const nightlyRateDisplay = (
    <span>
      {'¥ '}
      {nightlyRate.toLocaleString('ja-JP')}
    </span>
  );
  const perNightOrMonth = (
    <span>
      {' / night'}
    </span>
  );
  const ratingDisplay = reviewCount > 0
    ? (
      <span>
        <span className={styles.star}>{'★ '}</span>
        <span>{`${averageRating} `}</span>
        <span>{`(${reviewCount})`}</span>
      </span>
    )
    : null;
  const earliestAvailabileDate = dateComp.getEarliestAvailableDate(bookedDates);
  const earliestAvailabileDateString = earliestAvailabileDate
    ? earliestAvailabileDate.toLocaleString('en-US', { month: 'short', day: 'numeric' })
    : null;
  const earliestAvailability = (
    <span>
      <span>{`Earliest availability is ${earliestAvailabileDateString}. `}</span>
      <span>Add check-in date</span>
    </span>
  );

  return (
    <div>
      <div>
        {nightlyRateDisplay}
        {perNightOrMonth}
        {ratingDisplay}
      </div>
      <div>
        {earliestAvailability}
      </div>
    </div>
  );
};

Header.propTypes = {
  nightlyRate: PropTypes.number.isRequired,
  averageRating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  bookedDates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Header;

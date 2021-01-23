import React from 'react';
import PropTypes from 'prop-types';
import dateComp from '../utils/dateComputation';
import styles from './styles/Header.css';

const Header = ({
  nightlyRate,
  averageRating,
  reviewCount,
  bookedDates,
}) => {
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
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={
          {
            display: 'block',
            height: '16px',
            width: '16px',
            fill: 'currentcolor',
          }
        }
      >
        <path d="M23 21.5a2.502 2.502 0 0 0-2.5 2.5v6.767c.182-.094.354-.207.5-.353L29.414 22c.146-.146.26-.318.353-.5H23zM30 5c0-1.103-.897-2-2-2h-5.7V1h-2.6v2h-7.4V1H9.7v2H4c-1.103 0-2 .897-2 2v5.5h28V5zM12.5 7h-3V5h3v2zm10 0h-3V5h3v2z" />
        <path d="M23 18.5h7v-5H2V26c0 2.757 2.243 5 5 5h10.5v-7c0-3.032 2.468-5.5 5.5-5.5z" />
      </svg>
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

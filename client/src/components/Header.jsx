import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  const { nightlyRate, averageRating, reviewCount } = props;
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
        <span>{`★ ${averageRating} `}</span>
        <span>{`(${reviewCount})`}</span>
      </span>
    )
    : null;
  const earliestAvailability = (
    <span>
      <span>{'Earliest availability is <some_date>. '}</span>
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
};

export default Header;

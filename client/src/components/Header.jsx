import React from 'react';
import PropTypes from 'prop-types';

const getEarliestAvailableDate = (bookedDates) => {
  const currentDate = new Date();
  for (let i = 0; i < bookedDates.length; i += 1) {
    const { start, length } = bookedDates[i];
    const bookedUntil = new Date(start);
    bookedUntil.setDate(bookedUntil.getDate() + length);
    const dayAfterLastBooked = new Date(bookedUntil);
    dayAfterLastBooked.setDate(dayAfterLastBooked.getDate() + 1);
    const nextBookingStart = new Date(bookedDates[i + 1].start);
    if (dayAfterLastBooked.getDate() < nextBookingStart.getDate()) {
      if (currentDate.getDate() < dayAfterLastBooked.getDate()) {
        return dayAfterLastBooked;
      }
    }
  }
  return null;
};

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
        <span>{`★ ${averageRating} `}</span>
        <span>{`(${reviewCount})`}</span>
      </span>
    )
    : null;
  const earliestAvailabileDate = getEarliestAvailableDate(bookedDates) || new Date();
  const earliestAvailabileDateString = earliestAvailabileDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });
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

import React from 'react';
import $ from 'jquery';
import Header from './Header';
import Dates from './Dates';
import Guests from './Guests';
import Costs from './Costs';

const { Component } = React;

export default class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingId: window.location.pathname.match(/\/(\d+)\//)[1],
      nightlyRate: 0,
      averageRating: 0,
      reviewCount: 0,
      minNights: 0,
      maxGuests: 0,
      cleaningFee: 0,
      serviceFee: 0,
      occupancyTaxesAndFees: 0,
      discountWeekly10: 0,
      discountWeekly20: 0,
      discountMonthly20: 0,
      bookedDates: [],
      checkInDate: '',
      checkOutDate: '',
      DatesMaximized: false,
      DatesFocused: false,
      displayedMonth: new Date().getMonth() + 1,
      GuestsMaximized: false,
      GuestsFocused: false,
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    const { listingId } = this.state;
    this.getData(listingId);
  }

  getData(id) {
    $.ajax({
      url: `http://localhost:3003/api/listings/${id}`,
      method: 'GET',
      success: (data) => {
        const {
          listingId,
          nightlyRate,
          averageRating,
          reviewCount,
          minNights,
          maxGuests,
          cleaningFee,
          serviceFee,
          occupancyTaxesAndFees,
          discountWeekly10,
          discountWeekly20,
          discountMonthly20,
          bookedDates,
        } = data;
        this.setState({
          listingId,
          nightlyRate,
          averageRating,
          reviewCount,
          minNights,
          maxGuests,
          cleaningFee,
          serviceFee,
          occupancyTaxesAndFees,
          discountWeekly10,
          discountWeekly20,
          discountMonthly20,
          bookedDates,
        });
      },
      error: console.error
    });
  }

  render() {
    const {
      nightlyRate,
      averageRating,
      reviewCount,
      minNights,
      bookedDates,
      checkInDate,
      checkOutDate,
    } = this.state;
    const checkOrReserveButton = checkInDate === '' || checkOutDate === ''
      ? <button type="submit">Check Availability</button>
      : <button type="submit">Reserve</button>;

    return (
      <div>
        <Header
          nightlyRate={nightlyRate}
          averageRating={averageRating}
          reviewCount={reviewCount}
          bookedDates={bookedDates}
        />
        <Dates minNights={minNights} />
        <Guests />
        {checkOrReserveButton}
        <Costs />
      </div>
    );
  }
}

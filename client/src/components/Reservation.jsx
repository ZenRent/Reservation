import React from 'react';
import $ from 'jquery';
import Header from './Header';
import Dates from './Dates';
import Guests from './Guests';
import Costs from './Costs';
import styles from './styles/Reservation.css';
import './styles/global.css';

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
      calendarUTCDates: [],
      checkInDate: '',
      checkOutDate: '',
      DatesFocused: false,
      displayedMonth: new Date().getMonth() + 1,
      GuestsMaximized: false,
      GuestsFocused: false,
      DatesMaximized: false,
    };
    this.getData = this.getData.bind(this);
    this.handleMinimizeDates = this.handleMinimizeDates.bind(this);
    this.handleMaximizeDates = this.handleMaximizeDates.bind(this);
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
          calendarUTCDates,
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
          calendarUTCDates,
        });
      },
      error: console.error
    });
  }

  handleMinimizeDates() {
    this.setState({
      DatesMaximized: false,
    });
  }

  handleMaximizeDates() {
    this.setState({
      DatesMaximized: true,
    });
  }

  render() {
    const {
      nightlyRate,
      averageRating,
      reviewCount,
      minNights,
      calendarUTCDates,
      checkInDate,
      checkOutDate,
      DatesMaximized,
    } = this.state;
    const checkOrReserveButton = checkInDate === '' || checkOutDate === ''
      ? <button type="submit">Check Availability</button>
      : <button type="submit">Reserve</button>;

    return (
      <div className={styles.ReservationContainer}>
        <Header
          nightlyRate={nightlyRate}
          averageRating={averageRating}
          reviewCount={reviewCount}
          calendarUTCDates={calendarUTCDates}
          DatesMaximized={DatesMaximized}
          onMaximizeDates={this.handleMaximizeDates}
        />
        <Dates
          minNights={minNights}
          DatesMaximized={DatesMaximized}
          onMinimizeDates={this.handleMinimizeDates}
          onMaximizeDates={this.handleMaximizeDates}
          calendarUTCDates={calendarUTCDates}
        />
        <Guests />
        {checkOrReserveButton}
        <Costs />
      </div>
    );
  }
}

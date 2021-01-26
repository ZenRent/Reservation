import React from 'react';
import $ from 'jquery';
import Header from './Header';
import Dates from './Dates';
// import Guests from './Guests';
// import Costs from './Costs';
import dateComp from '../utils/dateComputation';
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
      // maxGuests: 0,
      // cleaningFee: 0,
      // serviceFee: 0,
      // occupancyTaxesAndFees: 0,
      // discountWeekly10: 0,
      // discountWeekly20: 0,
      // discountMonthly20: 0,
      calendarUTCDates: [],
      checkInDate: '',
      checkOutDate: '',
      checkInInput: '',
      checkOutInput: '',
      // DatesFocused: false,
      // displayedMonth: new Date().getMonth() + 1,
      // GuestsMaximized: false,
      // GuestsFocused: false,
      DatesMaximized: false,
    };
    this.handleMinimizeDates = this.handleMinimizeDates.bind(this);
    this.handleMaximizeDates = this.handleMaximizeDates.bind(this);
    this.handleReserveDates = this.handleReserveDates.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmitInput = this.handleSubmitInput.bind(this);
    this.handleClearInput = this.handleClearInput.bind(this);
    this.handleClearAllInput = this.handleClearAllInput.bind(this);
    this.handleClickDate = this.handleClickDate.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    const { listingId } = this.state;
    this.getData(listingId);
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

  handleReserveDates(event) {
    event.preventDefault();
    const {
      calendarUTCDates,
      checkInDate,
      checkOutDate,
    } = this.state;
    const updatedCalendarUTCDates = dateComp.getDatesWithAddedBooking(
      calendarUTCDates,
      checkInDate,
      checkOutDate,
    );
    this.setState({
      calendarUTCDates: updatedCalendarUTCDates,
      checkInInput: '',
      checkOutInput: '',
      checkInDate: '',
      checkOutDate: '',
    });
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmitInput(event) {
    event.preventDefault();
    const { name } = event.target;
    const { checkInInput, checkOutInput } = this.state;
    if (name === 'checkInInput') {
      this.setState({
        checkInDate: checkInInput,
      });
      if (checkInInput.match(/\d+\/\d+\/\d+/)) {
        this.refs.datesRef.focusCheckOutInputField();
      }
    } else if (name === 'checkOutInput') {
      this.setState({
        checkOutDate: checkOutInput,
      });
    }
  }

  handleClearInput(event) {
    event.preventDefault();
    const { name } = event.target;
    if (name === 'checkInInput') {
      this.setState({
        checkInInput: '',
        checkOutInput: '',
        checkInDate: '',
        checkOutDate: '',
      });
    } else if (name === 'checkOutInput') {
      this.setState({
        checkOutInput: '',
        checkOutDate: '',
      });
    }
  }

  handleClearAllInput(event) {
    event.preventDefault();
    this.setState({
      checkInInput: '',
      checkOutInput: '',
      checkInDate: '',
      checkOutDate: '',
    });
  }

  handleClickDate(date) {
    const { checkInDate, checkOutDate } = this.state;
    const dateString = dateComp.getDateString(date);
    if (checkInDate === ''
      || (checkInDate.length >= 8 && checkOutDate.length >= 8)) {
      this.setState({
        checkInDate: dateString,
        checkInInput: dateString,
        checkOutDate: '',
        checkOutInput: '',
      });
    } else if (checkInDate.length >= 8 && checkOutDate === '') {
      this.setState({
        checkOutDate: dateString,
        checkOutInput: dateString,
      });
      if (dateString.length >= 8) {
        setTimeout(this.handleMinimizeDates, 350);
      }
    }
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
          // maxGuests,
          // cleaningFee,
          // serviceFee,
          // occupancyTaxesAndFees,
          // discountWeekly10,
          // discountWeekly20,
          // discountMonthly20,
          calendarUTCDates,
        } = data;
        this.setState({
          listingId,
          nightlyRate,
          averageRating,
          reviewCount,
          minNights,
          // maxGuests,
          // cleaningFee,
          // serviceFee,
          // occupancyTaxesAndFees,
          // discountWeekly10,
          // discountWeekly20,
          // discountMonthly20,
          calendarUTCDates,
        });
      },
      error: console.error,
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
      checkInInput,
      checkOutInput,
      DatesMaximized,
    } = this.state;
    const checkOrReserveButton = checkInDate === '' || checkOutDate === ''
      ? (
        <button
          className={styles.reserveButton}
          type="button"
          onClick={this.handleMaximizeDates}
        >
          Check availability
        </button>
      )
      : (
        <button
          className={styles.reserveButton}
          type="button"
          onClick={this.handleReserveDates}
        >
          Reserve
        </button>
      );

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
          ref="datesRef"
          minNights={minNights}
          DatesMaximized={DatesMaximized}
          onMinimizeDates={this.handleMinimizeDates}
          onMaximizeDates={this.handleMaximizeDates}
          calendarUTCDates={calendarUTCDates}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          checkInInput={checkInInput}
          checkOutInput={checkOutInput}
          onClickDate={this.handleClickDate}
          onInput={this.handleInput}
          onSubmitInput={this.handleSubmitInput}
          onClearInput={this.handleClearInput}
          onClearAllInput={this.handleClearAllInput}
        />
        {/* <Guests /> */}
        {checkOrReserveButton}
        {/* <Costs /> */}
      </div>
    );
  }
}

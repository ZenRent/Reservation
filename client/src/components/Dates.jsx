import React from 'react';
import PropTypes from 'prop-types';
import DateInput from './DateInput';
import Calendar from './Calendar';
import Week from './Week';
import styles from './styles/Dates.css';

const { Component } = React;

export default class Dates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formFocus: '',
      fieldFocus: '',
      checkInInput: '',
      checkOutInput: '',
      scrollPosition: 0,
    };
    this.handleMinimizeDates = this.handleMinimizeDates.bind(this);
    this.handleMaximizeDates = this.handleMaximizeDates.bind(this);
    this.handleFieldFocus = this.handleFieldFocus.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.clearAllInput = this.clearAllInput.bind(this);
    this.moveScrollPositionLeft = this.moveScrollPositionLeft.bind(this);
    this.moveScrollPositionRight = this.moveScrollPositionRight.bind(this);
  }

  handleMinimizeDates() {
    const { onMinimizeDates } = this.props;
    onMinimizeDates();
    this.setState({
      scrollPosition: 0,
    });
  }

  handleMaximizeDates() {
    const { onMaximizeDates } = this.props;
    onMaximizeDates();
  }

  handleFieldFocus(event) {
    const { name } = event.currentTarget;
    const focus = name.match(/(.+)Input/) ? name.match(/(.+)Input/)[1] : '';
    this.setState({
      formFocus: focus,
      fieldFocus: focus,
    });
  }

  handleFieldBlur() {
    this.setState({
      fieldFocus: '',
    });
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  clearInput(event) {
    event.preventDefault();
    const { name } = event.target;
    this.setState({
      [name]: '',
    });
  }

  clearAllInput(event) {
    event.preventDefault();
    this.setState({
      formFocus: 'checkIn',
      fieldFocus: '',
      checkInInput: '',
      checkOutInput: '',
    });
  }

  moveScrollPositionLeft() {
    const { scrollPosition } = this.state;
    if (scrollPosition > 0) {
      this.setState({
        scrollPosition: scrollPosition - 1,
      });
    }
  }

  moveScrollPositionRight() {
    const { scrollPosition } = this.state;
    if (scrollPosition < 18) {
      this.setState({
        scrollPosition: scrollPosition + 1,
      });
    }
  }

  render() {
    const {
      formFocus,
      fieldFocus,
      checkInInput,
      checkOutInput,
      scrollPosition,
    } = this.state;
    const {
      minNights,
      DatesMaximized,
      calendarUTCDates,
      checkInDate,
      checkOutDate,
    } = this.props;

    const selectDates = DatesMaximized
      ? (
        <div className={styles.selectDatesContainer}>
          <div className={styles.selectDates}>
            Select dates
          </div>
          <div className={styles.minimumStay}>
            {`Minimum stay: ${minNights} ${minNights === 1 ? 'night' : 'nights'}`}
          </div>
        </div>
      )
      : null;

    const calendar = DatesMaximized
      ? (
        <Calendar
          scrollPosition={scrollPosition}
          calendarUTCDates={calendarUTCDates}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
        />
      )
      : null;

    const footer = DatesMaximized
      ? (
        <div className={styles.footer}>
          <button className={styles.keyboardButton} type="button">
            <svg
              className={styles.keyboardButtonIcon}
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <path d="M29 5a2 2 0 0 1 1.995 1.85L31 7v18a2 2 0 0 1-1.85 1.995L29 27H3a2 2 0 0 1-1.995-1.85L1 25V7a2 2 0 0 1 1.85-1.995L3 5zm0 2H3v18h26zm-8 13v2H11v-2zm3-5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm16-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </button>
          <div>
            <div className={styles.clearDatesButtonContainer}>
              <button className={styles.clearDatesButton} type="button" onClick={this.clearAllInput}>Clear dates</button>
            </div>
            <div className={styles.closeButtonContainer}>
              <button className={styles.closeButton} type="button" onClick={this.handleMinimizeDates}>Close</button>
            </div>
          </div>
        </div>
      )
      : null;

    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const dayLabels = DatesMaximized
      ? <Week week={daysOfWeek} />
      : null;

    const calendarMovementButtons = DatesMaximized
      ? (
        <div className={styles.calendarMovementButtonContainer}>
          <div className={styles.calendarMovementButtonIndividualContainer}>
            <button
              className={scrollPosition > 0
                ? styles.calendarMovementButton
                : styles.calendarMovementButtonDisabled}
              type="button"
              onClick={this.moveScrollPositionLeft}
            >
              <svg
                className={scrollPosition > 0
                  ? styles.calendarMovementButtonIcon
                  : styles.calendarMovementButtonIconDisabled}
                viewBox="0 0 18 18"
                role="presentation"
                aria-hidden="true"
                focusable="false"
              >
                <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className={styles.calendarMovementButtonIndividualContainer}>
            <button
              className={scrollPosition < 18
                ? styles.calendarMovementButton
                : styles.calendarMovementButtonDisabled}
              type="button"
              onClick={this.moveScrollPositionRight}
            >
              <svg
                className={scrollPosition < 18
                  ? styles.calendarMovementButtonIcon
                  : styles.calendarMovementButtonIconDisabled}
                viewBox="0 0 18 18"
                role="presentation"
                aria-hidden="true"
                focusable="false"
              >
                <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )
      : null;

    return (
      <div className={styles.fixedInPlaceDatesContainer}>
        <div
          className={DatesMaximized
            ? styles.minimizeDatesLayerEnabled
            : styles.minimizeDatesLayerDisabled}
          onClick={this.handleMinimizeDates}
          onKeyUp={this.handleMinimizeDates}
          key="Escape"
          role="button"
          label="Minimize Dates"
          tabIndex={0}
        />
        <div
          onFocus={this.handleMaximizeDates}
          className={DatesMaximized
            ? styles.DatesContainerMaximized
            : styles.DatesContainerMinimized}
        >
          <div
            className={DatesMaximized
              ? styles.dateInputOuterGridContainerDatesMaximized
              : styles.dateInputOuterGridContainerDatesMinimized}
          >
            {selectDates}
            <div className={styles.borderDatesContainer}>
              <div className={styles.dateInputInnerGridContainer}>
                <div className={formFocus !== '' && DatesMaximized
                  ? styles.checkInInputBorderInputHasFocus
                  : styles.checkInInputBorder}
                >
                  <div className={formFocus === 'checkIn' && DatesMaximized
                    ? styles.checkInInputFocused
                    : styles.checkInInputUnfocused}
                  >
                    <DateInput
                      onFieldFocus={this.handleFieldFocus}
                      onFieldBlur={this.handleFieldBlur}
                      dateType="check-in"
                      DatesMaximized={DatesMaximized}
                      // formFocus={formFocus}
                      fieldFocus={fieldFocus}
                      input={checkInInput}
                      onInput={this.handleInput}
                      onClear={this.clearInput}
                      onMaximizeDates={this.handleMaximizeDates}
                    />
                  </div>
                </div>
                <div className={styles.checkOutInputBorder}>
                  <div className={formFocus === 'checkOut' && DatesMaximized
                    ? styles.checkOutInputFocused
                    : styles.checkOutInputUnfocused}
                  >
                    <DateInput
                      onFieldFocus={this.handleFieldFocus}
                      onFieldBlur={this.handleFieldBlur}
                      dateType="checkout"
                      DatesMaximized={DatesMaximized}
                      // formFocus={formFocus}
                      fieldFocus={fieldFocus}
                      input={checkOutInput}
                      onInput={this.handleInput}
                      onClear={this.clearInput}
                      onMaximizeDates={this.handleMaximizeDates}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.dayLabelRelativeContainer}>
            <div className={styles.dayLabelAbsoluteContainer}>
              <div className={styles.dayLabelFlexContainer}>
                <span className={styles.dayLabel}>{dayLabels}</span>
                <span className={styles.dayLabel}>{dayLabels}</span>
              </div>
            </div>
            <div className={styles.calendarMovementButtonAbsoluteContainer}>
              {calendarMovementButtons}
            </div>
          </div>
          {calendar}
          {footer}
        </div>
      </div>
    );
  }
}

Dates.propTypes = {
  minNights: PropTypes.number.isRequired,
  DatesMaximized: PropTypes.bool.isRequired,
  onMinimizeDates: PropTypes.func.isRequired,
  onMaximizeDates: PropTypes.func.isRequired,
  calendarUTCDates: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkInDate: PropTypes.string.isRequired,
  checkOutDate: PropTypes.string.isRequired,
};

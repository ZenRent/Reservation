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
      // DatesMaximized: false,
      DatesMaximized: true,
      formFocus: '',
      fieldFocus: '',
      checkInInput: '',
      checkOutInput: '',
      scrollPosition: 0,
    };
    this.handleDatesFocus = this.handleDatesFocus.bind(this);
    this.handleDatesBlur = this.handleDatesBlur.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFieldFocus = this.handleFieldFocus.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.clearAllInput = this.clearAllInput.bind(this);
    this.moveScrollPositionLeft = this.moveScrollPositionLeft.bind(this);
    this.moveScrollPositionRight = this.moveScrollPositionRight.bind(this);
  }

  handleDatesFocus() {
    this.setState({
      DatesMaximized: true,
    });
  }

  // handleDatesBlur(event) {
  //   if (event.relatedTarget === null) {
  //     this.setState({
  //       DatesMaximized: false,
  //     });
  //   }
  // }

  handleDatesBlur(event) {
    if (event.relatedTarget === null) {
      this.setState({
        DatesMaximized: true,
      });
    }
  }

  handleClose() {
    this.setState({
      DatesMaximized: false,
    });
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
      formFocus: '',
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
      DatesMaximized,
      formFocus,
      fieldFocus,
      checkInInput,
      checkOutInput,
      scrollPosition,
    } = this.state;
    const { minNights } = this.props;

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
      ? <Calendar scrollPosition={scrollPosition} />
      : null;

    const footer = DatesMaximized
      ? (
        <div className={styles.footer}>
          {/* <span className={styles.keyboardIcon} /> */}
          <button className={styles.keyboardButton} type="button">
            <svg
              className={styles.keyboardButtonIcon}
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              // style={
              //   {
              //     display: 'inline-block',
              //     height: '24px',
              //     width: '24px',
              //     fill: 'currentcolor',
              //   }
              // }
            >
              <path d="M29 5a2 2 0 0 1 1.995 1.85L31 7v18a2 2 0 0 1-1.85 1.995L29 27H3a2 2 0 0 1-1.995-1.85L1 25V7a2 2 0 0 1 1.85-1.995L3 5zm0 2H3v18h26zm-8 13v2H11v-2zm3-5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm16-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </button>
          <div>
            <button className={styles.clearDatesButton} type="button" onClick={this.clearAllInput}>Clear dates</button>
            <button className={styles.closeButton} type="button" onClick={this.handleClose}>Close</button>
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
          {/* <button type="button" onClick={this.moveScrollPositionLeft}>←</button> */}
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
          {/* <button type="button" onClick={this.moveScrollPositionRight}>→</button> */}
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
      )
      : null;

    return (
      <div className={styles.fixedInPlaceDatesContainer}>
        <div
          tabIndex={1}
          onFocus={this.handleDatesFocus}
          onBlur={this.handleDatesBlur}
          className={DatesMaximized
            ? styles.DatesContainerMaximized
            : styles.DatesContainerMinimized}
        >
          <div className={styles.dateInputOuterGridContainer}>
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
                      formFocus={formFocus}
                      fieldFocus={fieldFocus}
                      input={checkInInput}
                      onInput={this.handleInput}
                      onClear={this.clearInput}
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
                      formFocus={formFocus}
                      fieldFocus={fieldFocus}
                      input={checkOutInput}
                      onInput={this.handleInput}
                      onClear={this.clearInput}
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
};

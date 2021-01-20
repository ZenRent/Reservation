import React from 'react';
import PropTypes from 'prop-types';
import DateInput from './DateInput';
import Calendar from './Calendar';

const { Component } = React;

export default class Dates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DatesMaximized: false,
      formFocus: '',
      fieldFocus: '',
      checkInInput: '',
      checkOutInput: '',
    };
    this.handleDatesFocus = this.handleDatesFocus.bind(this);
    this.handleDatesBlur = this.handleDatesBlur.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFieldFocus = this.handleFieldFocus.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.clearAllInput = this.clearAllInput.bind(this);
  }

  handleDatesFocus() {
    this.setState({
      DatesMaximized: true,
    });
  }

  handleDatesBlur(event) {
    if (event.relatedTarget === null) {
      this.setState({
        DatesMaximized: false,
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

  render() {
    const {
      DatesMaximized,
      formFocus,
      fieldFocus,
      checkInInput,
      checkOutInput,
    } = this.state;
    const { minNights } = this.props;

    const selectDates = DatesMaximized
      ? (
        <td>
          <div>
            Select dates
          </div>
          <div>
            {`Minimum stay: ${minNights} ${minNights === 1 ? 'night' : 'nights'}`}
          </div>
        </td>
      )
      : null;

    const calendar = DatesMaximized
      ? <Calendar />
      : null;

    const footer = DatesMaximized
      ? (
        <div>
          <span><img src="./img/kb_no-hover.png" alt="keyboard icon" style={{ width: '24px', height: 'auto' }} /></span>
          <button type="button" onClick={this.clearAllInput}>Clear dates</button>
          <button type="button" onClick={this.handleClose}>Close</button>
        </div>
      )
      : null;

    return (
      <div
        tabIndex={1}
        onFocus={this.handleDatesFocus}
        onBlur={this.handleDatesBlur}
        style={{ outline: 'none' }}
      >
        <table>
          <tbody>
            <tr>
              {selectDates}
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
            </tr>
          </tbody>
        </table>
        {calendar}
        {footer}
      </div>
    );
  }
}

Dates.propTypes = {
  minNights: PropTypes.number.isRequired,
};

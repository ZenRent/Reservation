import React from 'react';
import Calendar from './Calendar';

const { Component } = React;

export default class Dates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DatesFocused: false,
      DatesMaximized: false,
      formFocus: '',
      fieldFocus: '',
      checkInInput: '',
      checkOutInput: '',
    };
    this.handleDatesClick = this.handleDatesClick.bind(this);
    this.handleDatesFocus = this.handleDatesFocus.bind(this);
    this.handleDatesBlur = this.handleDatesBlur.bind(this);
    this.handleFieldFocus = this.handleFieldFocus.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleDatesClick() {
    this.setState({
      DatesFocused: true,
    });
  }

  handleDatesFocus() {
    this.setState({
      DatesMaximized: true,
    });
  }

  handleDatesBlur() {
    this.setState({
      DatesMaximized: false,
    });
  }

  handleFieldFocus(event) {
    const { name } = event.target;
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

  render() {
    const {
      DatesFocused,
      DatesMaximized,
      formFocus,
      checkInInput,
      checkOutInput,
      fieldFocus,
    } = this.state;
    const checkInCheckOutTableBorderStyle = DatesFocused ? {
      border: '3px black solid',
    } : {
      border: '1px black solid',
    };
    const checkInTableBorderStyle = formFocus === 'checkIn' ? {
      border: '3px black solid',
    } : {
      border: '1px black solid',
    };
    const checkOutTableBorderStyle = formFocus === 'checkOut' ? {
      border: '3px black solid',
    } : {
      border: '1px black solid',
    };
    const dateInputBox = (formAndFieldFocusValue, formAndFieldName, fieldId, labelText) => (
      <td style={formFocus === formAndFieldFocusValue
        ? { border: '3px black solid' }
        : { border: '1px black solid' }}
      >
        <form
          name={formAndFieldName}
          onReset={this.clearInput}
          onFocus={this.handleFieldFocus}
          onBlur={this.handleFieldBlur}
        >
          <label htmlFor={fieldId}>
            <div style={{ pointerEvents: 'none', textTransform: 'uppercase' }}>
              {labelText}
            </div>
            <input
              type="text"
              name={formAndFieldName}
              id={fieldId}
              value={checkOutInput}
              onChange={this.handleInput}
              placeholder={fieldFocus === formAndFieldFocusValue
                ? 'MM/DD/YYYY'
                : 'Add date'}
            />
          </label>
          {checkOutInput !== '' ? <input type="reset" value="×" /> : null}
        </form>
      </td>
    );

    const calendar = DatesMaximized ? <Calendar /> : null;

    return (
      <div>
        <div onFocus={this.handleDatesFocus} onBlur={this.handleDatesBlur}>
          <table>
            <tbody>
              <tr>
                {dateInputBox('checkIn', 'checkInInput', 'checkInInputField', 'Check-in')}
                {dateInputBox('checkOut', 'checkOutInput', 'checkOutInputField', 'Checkout')}
                {/* <td style={checkInTableBorderStyle}>
                  <form name="checkInInput" onReset={this.clearInput} onFocus={this.handleFieldFocus} onBlur={this.handleFieldBlur}>
                    <label htmlFor="checkInInputField">
                      <div style={{ pointerEvents: 'none', textTransform: 'uppercase' }}>Check-in</div>
                      <input type="text" name="checkInInput" id="checkInInputField" value={checkInInput} onChange={this.handleInput} placeholder={fieldFocus === 'checkIn' ? 'MM/DD/YYYY' : 'Add date'} />
                    </label>
                    {checkInInput !== '' ? <input type="reset" value="×" /> : null}
                  </form>
                </td> */}
                {/* <td style={checkOutTableBorderStyle}>
                  <form name="checkOutInput" onReset={this.clearInput} onFocus={this.handleFieldFocus} onBlur={this.handleFieldBlur}>
                    <label htmlFor="checkOutInputField">
                      <div style={{ pointerEvents: 'none', textTransform: 'uppercase' }}>Checkout</div>
                      <input type="text" name="checkOutInput" id="checkOutInputField" value={checkOutInput} onChange={this.handleInput} placeholder={fieldFocus === 'checkOut' ? 'MM/DD/YYYY' : 'Add date'} />
                    </label>
                    {checkOutInput !== '' ? <input type="reset" value="×" /> : null}
                  </form>
                </td> */}
              </tr>
            </tbody>
          </table>
          {calendar}
        </div>
      </div>
    );
  }
}

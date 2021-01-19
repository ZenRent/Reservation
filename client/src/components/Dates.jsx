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

    let datesDisplay;
    if (DatesMaximized) {
      datesDisplay = (
        <div onFocus={this.handleDatesFocus} onBlur={this.handleDatesBlur}>
          <table>
            <tbody>
              <tr>
                <td style={checkInTableBorderStyle}>
                  <form name="checkInInput" onReset={this.clearInput} onFocus={this.handleFieldFocus} onBlur={this.handleFieldBlur}>
                    <label htmlFor="checkInInputField">
                      Check-in
                      <input type="text" name="checkInInput" id="checkInInputField" value={checkInInput} onChange={this.handleInput} placeholder={fieldFocus === 'checkIn' ? 'MM/DD/YYYY' : 'Add date'} />
                    </label>
                    {checkInInput !== '' ? <input type="reset" value="×" /> : null}
                  </form>
                </td>
                <td style={checkOutTableBorderStyle}>
                  <form name="checkOutInput" onReset={this.clearInput} onFocus={this.handleFieldFocus} onBlur={this.handleFieldBlur}>
                    <label htmlFor="checkOutInputField">
                      Checkout
                      <input type="text" name="checkOutInput" id="checkOutInputField" value={checkOutInput} onChange={this.handleInput} placeholder={fieldFocus === 'checkOut' ? 'MM/DD/YYYY' : 'Add date'} />
                    </label>
                    {checkOutInput !== '' ? <input type="reset" value="×" /> : null}
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
          <Calendar />
        </div>
      );
    } else {
      datesDisplay = (
        <div onClick={this.handleDatesClick} onFocus={this.handleDatesFocus}>
          <table>
            <tbody>
              <tr>
                <td style={checkInCheckOutTableBorderStyle}>
                  <form name="checkInInput" onReset={this.clearInput} onFocus={this.handleFieldFocus} onBlur={this.handleFieldBlur}>
                    <label htmlFor="checkInInputField">
                      Check-in
                      <input type="text" name="checkInInput" id="checkInInputField" value={checkInInput} onChange={this.handleInput} placeholder={fieldFocus === 'checkIn' ? 'MM/DD/YYYY' : 'Add date'} />
                    </label>
                    {checkInInput !== '' ? <input type="reset" value="×" /> : null}
                  </form>
                </td>
                <td style={checkInCheckOutTableBorderStyle}>
                  <form name="checkOutInput" onReset={this.clearInput} onFocus={this.handleFieldFocus} onBlur={this.handleFieldBlur}>
                    <label htmlFor="checkOutInputField">
                      Checkout
                      <input type="text" name="checkOutInput" id="checkOutInputField" value={checkOutInput} onChange={this.handleInput} placeholder={fieldFocus === 'checkOut' ? 'MM/DD/YYYY' : 'Add date'} />
                    </label>
                    {checkOutInput !== '' ? <input type="reset" value="×" /> : null}
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div>
        {datesDisplay}
      </div>
    );
  }
}

import React from 'react';
import Calendar from './Calendar';

const { Component } = React;

export default class Dates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // DatesFocused: false, // Requires click (not blur) handling to implement
      DatesMaximized: false,
      formFocus: '',
      fieldFocus: '',
      checkInInput: '',
      checkOutInput: '',
    };
    // this.handleDatesClick = this.handleDatesClick.bind(this);
    this.handleDatesFocus = this.handleDatesFocus.bind(this);
    this.handleDatesBlur = this.handleDatesBlur.bind(this);
    this.handleFieldFocus = this.handleFieldFocus.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  // handleDatesClick() {
  //   this.setState({
  //     DatesFocused: true,
  //   });
  // }

  handleDatesFocus() {
    this.setState({
      DatesMaximized: true,
    });
  }

  handleDatesBlur(event) {
    // console.log('event.target:');
    // console.log(event.target);
    // console.log('event.currentTarget:');
    // console.log(event.currentTarget);
    // console.log('event.relatedTarget:');
    // console.log(event.relatedTarget);
    // if (event.target === event.currentTarget) {
    if (event.relatedTarget === null) {
      this.setState({
        DatesMaximized: false,
      });
    }
  }

  handleFieldFocus(event) {
    const { name } = event.currentTarget;
    const focus = name.match(/(.+)Input/) ? name.match(/(.+)Input/)[1] : '';
    this.setState({
      formFocus: focus,
      fieldFocus: focus,
    });
  }

  handleFieldBlur(event) {
    if (event.target === event.currentTarget) {
      this.setState({
        fieldFocus: '',
      });
    }
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
      // DatesFocused,
      DatesMaximized,
      formFocus,
      checkInInput,
      checkOutInput,
      fieldFocus,
    } = this.state;
    const dateInputBox = (dateType) => {
      const dateTypeWithoutHyphen = dateType.indexOf('-') > -1
        ? dateType.slice(0, dateType.indexOf('-')) + dateType.slice(dateType.indexOf('-') + 1)
        : dateType;
      const formAndFieldFocusValue = dateTypeWithoutHyphen.slice(0,5)
        + dateTypeWithoutHyphen.charAt(5).toUpperCase()
        + dateTypeWithoutHyphen.slice(6);
      const formAndFieldName = `${formAndFieldFocusValue}Input`;
      const fieldId = `${formAndFieldName}Field`;
      const labelText = dateType.charAt(0).toUpperCase() + dateType.slice(1);
      return (
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
                value={formAndFieldFocusValue === 'checkIn' ? checkInInput : checkOutInput}
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
    };

    const calendar = DatesMaximized ? <Calendar /> : null;

    return (
      // <div>
      <div
        tabIndex={1}
        onFocus={this.handleDatesFocus}
        onBlur={this.handleDatesBlur}
        style={{ outline: 'none' }}
      >
        <table>
          <tbody>
            <tr>
              {/* {dateInputBox('checkIn', 'checkInInput', 'checkInInputField', 'Check-in')}
              {dateInputBox('checkOut', 'checkOutInput', 'checkOutInputField', 'Checkout')} */}
              {dateInputBox('check-in')}
              {dateInputBox('checkout')}
            </tr>
          </tbody>
        </table>
        {calendar}
      </div>
      // </div>
    );
  }
}

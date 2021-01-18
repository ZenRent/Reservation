import React from 'react';
import Calendar from './Calendar';

const { Component } = React;

class Dates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formFocus: '',
      fieldFocus: '',
      checkInInput: '',
      checkOutInput: '',
    };
    this.handleFieldFocus = this.handleFieldFocus.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleFieldFocus(event) {
    const { name } = event.target;
    const focus = name.match(/(.+)Input/) ? name.match(/(.+)Input/)[1] : '';
    this.setState({
      fieldFocus: focus,
    });
  }

  handleFieldBlur(event) {
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
    const { checkInInput, checkOutInput, fieldFocus } = this.state;
    const tempTableBorderStyle = {
      border: '1px black solid',
    };

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td style={tempTableBorderStyle}>
                <form name="checkInInput" onReset={this.clearInput} onFocus={this.handleFieldFocus} onBlur={this.handleFieldBlur}>
                  <label htmlFor="checkInInputField">
                    Check-in
                    <input type="text" name="checkInInput" id="checkInInputField" value={checkInInput} onChange={this.handleInput} placeholder={fieldFocus === 'checkIn' ? 'MM/DD/YYYY' : 'Add date'} />
                  </label>
                  <input type="reset" value="×" />
                </form>
              </td>
              <td style={tempTableBorderStyle}>
                <form name="checkOutInput" onReset={this.clearInput} onFocus={this.handleFieldFocus} onBlur={this.handleFieldBlur}>
                  <label htmlFor="checkOutInputField">
                    Checkout
                    <input type="text" name="checkOutInput" id="checkOutInputField" value={checkOutInput} onChange={this.handleInput} placeholder={fieldFocus === 'checkOut' ? 'MM/DD/YYYY' : 'Add date'} />
                  </label>
                  <input type="reset" value="×" />
                </form>
              </td>
            </tr>
          </tbody>
        </table>
        <Calendar />
      </div>
    );
  }
}

export default Dates;

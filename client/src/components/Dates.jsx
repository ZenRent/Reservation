import React from 'react';
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
    };
    this.handleDatesFocus = this.handleDatesFocus.bind(this);
    this.handleDatesBlur = this.handleDatesBlur.bind(this);
    this.handleFieldFocus = this.handleFieldFocus.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
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

  render() {
    const {
      DatesMaximized,
      formFocus,
      fieldFocus,
    } = this.state;

    const calendar = DatesMaximized ? <Calendar /> : null;

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
              <DateInput
                onFieldFocus={this.handleFieldFocus}
                onFieldBlur={this.handleFieldBlur}
                dateType="check-in"
                DatesMaximized={DatesMaximized}
                formFocus={formFocus}
                fieldFocus={fieldFocus}
              />
              <DateInput
                onFieldFocus={this.handleFieldFocus}
                onFieldBlur={this.handleFieldBlur}
                dateType="checkout"
                DatesMaximized={DatesMaximized}
                formFocus={formFocus}
                fieldFocus={fieldFocus}
              />
            </tr>
          </tbody>
        </table>
        {calendar}
      </div>
    );
  }
}

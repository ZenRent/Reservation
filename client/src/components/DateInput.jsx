import React from 'react';
import PropTypes from 'prop-types';

const { Component } = React;

export default class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleInput(event) {
    const { value } = event.target;
    this.setState({
      input: value,
    });
  }

  clearInput(event) {
    event.preventDefault();
    this.setState({
      input: '',
    });
  }

  render() {
    const { input } = this.state;
    const {
      dateType,
      onFieldFocus,
      onFieldBlur,
      DatesMaximized,
      formFocus,
      fieldFocus,
    } = this.props;
    const dateTypeWithoutHyphen = dateType.indexOf('-') > -1
      ? dateType.slice(0, dateType.indexOf('-')) + dateType.slice(dateType.indexOf('-') + 1)
      : dateType;
    const formAndFieldFocusValue = dateTypeWithoutHyphen.slice(0, 5)
      + dateTypeWithoutHyphen.charAt(5).toUpperCase()
      + dateTypeWithoutHyphen.slice(6);
    const formAndFieldName = `${formAndFieldFocusValue}Input`;
    const fieldId = `${formAndFieldName}Field`;
    const labelText = dateType.charAt(0).toUpperCase() + dateType.slice(1);

    return (
      <td style={formFocus === formAndFieldFocusValue && DatesMaximized
        ? { border: '3px black solid' }
        : { border: '1px black solid' }}
      >
        <form
          name={formAndFieldName}
          onReset={this.clearInput}
          onFocus={onFieldFocus}
          onBlur={onFieldBlur}
        >
          <label htmlFor={fieldId}>
            <div style={{ pointerEvents: 'none', textTransform: 'uppercase' }}>
              {labelText}
            </div>
            <input
              type="text"
              name={formAndFieldName}
              id={fieldId}
              value={input}
              onChange={this.handleInput}
              placeholder={fieldFocus === formAndFieldFocusValue
                ? 'MM/DD/YYYY'
                : 'Add date'}
            />
          </label>
          {input !== '' ? <input type="reset" value="×" /> : null}
        </form>
      </td>
    );
  }
}

DateInput.propTypes = {
  dateType: PropTypes.string.isRequired,
  onFieldFocus: PropTypes.func.isRequired,
  onFieldBlur: PropTypes.func.isRequired,
  DatesMaximized: PropTypes.bool.isRequired,
  formFocus: PropTypes.string.isRequired,
  fieldFocus: PropTypes.string.isRequired,
};

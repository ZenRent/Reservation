import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/DateInput.css';

const { Component } = React;

export default class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.focusInputField = this.focusInputField.bind(this);
  }

  focusInputField() {
    this.refs.inputField.focus();
  }

  render() {
    const {
      dateType,
      onFieldFocus,
      onFieldBlur,
      DatesMaximized,
      // formFocus,
      fieldFocus,
      input,
      onInput,
      onSubmitInput,
      onClear,
      onMaximizeDates,
      tabIndexValue,
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
      <div
        className={DatesMaximized
          ? styles.dateInputContainerDatesMaximized
          : styles.dateInputContainerDatesMinimized}
        onClick={DatesMaximized
          ? () => {}
          : onMaximizeDates}
        onKeyUp={DatesMaximized
          ? () => {}
          : onMaximizeDates}
        key="Space"
        role="button"
        label="Minimize Dates"
        tabIndex={-1}
      >
        <form
          className={styles.inputForm}
          name={formAndFieldName}
          onReset={onClear}
          onSubmit={onSubmitInput}
          onFocus={onFieldFocus}
          onBlur={onFieldBlur}
        >
          <label
            className={DatesMaximized
              ? styles.inputLabelDatesMaximized
              : styles.inputLabelDatesMinimized}
            htmlFor={fieldId}
          >
            <div className={styles.dateInputLabel}>
              {labelText}
            </div>
            <input
              ref="inputField"
              className={DatesMaximized
                ? styles.inputFieldDatesMaximized
                : styles.inputFieldDatesMinimized}
              type="text"
              name={formAndFieldName}
              id={fieldId}
              value={input}
              onChange={onInput}
              onBlur={onSubmitInput}
              // onKeyDown={(event) => {
              //   if (event.key === 'Tab') {
              //     onSubmitInput(event);
              //   }
              // }}
              placeholder={fieldFocus === formAndFieldFocusValue && DatesMaximized
                ? 'MM/DD/YYYY'
                : 'Add date'}
              tabIndex={tabIndexValue}
            />
          </label>
          {input !== '' ? <input className={styles.inputClear} type="reset" value="×" /> : null}
        </form>
      </div>
    );
  }
}

DateInput.propTypes = {
  dateType: PropTypes.string.isRequired,
  onFieldFocus: PropTypes.func.isRequired,
  onFieldBlur: PropTypes.func.isRequired,
  DatesMaximized: PropTypes.bool.isRequired,
  // formFocus: PropTypes.string.isRequired,
  fieldFocus: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
  onSubmitInput: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onMaximizeDates: PropTypes.func.isRequired,
  tabIndexValue: PropTypes.number.isRequired,
};

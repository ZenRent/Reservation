import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

const { Component } = React;

export default class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      dateType,
      onFieldFocus,
      onFieldBlur,
      DatesMaximized,
      formFocus,
      fieldFocus,
      input,
      onInput,
      onClear,
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

    // const TableCell = styled.td`
    //   border: ${(props) => (props.focused ? '3px black solid' : '1px black solid')};
    // `;

    return (
      // <TableCell focused={formFocus === formAndFieldFocusValue && DatesMaximized}>
      <td style={formFocus === formAndFieldFocusValue && DatesMaximized
        ? { border: '3px black solid' }
        : { border: '1px black solid' }}
      >
        <form
          name={formAndFieldName}
          onReset={onClear}
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
              onChange={onInput}
              placeholder={fieldFocus === formAndFieldFocusValue && DatesMaximized
                ? 'MM/DD/YYYY'
                : 'Add date'}
            />
          </label>
          {input !== '' ? <input type="reset" value="×" /> : null}
        </form>
      {/* </TableCell> */}
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
  input: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

import React from "react";
import PropTypes from "prop-types";
import { formatDate, parseDate } from "react-day-picker/moment";
import Input from "react-day-picker/DayPickerInput";
import "./DateInput.module.scss";

const DateInput = ({ value, ...rest }) => {
  return (
    <Input
      {...rest}
      formatDate={formatDate}
      parseDate={parseDate}
      format="D MMMM"
      value={value}
    />
  );
};

DateInput.propTypes = {
  value: PropTypes.any
};

export default DateInput;

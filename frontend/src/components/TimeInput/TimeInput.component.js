import React from "react";
import PropTypes from "prop-types";

const TimeInput = ({ value, onChange, ...rest }) => {
  const pad = n => (n > 9 ? n : "0" + n);

  const format = d => {
    let h = d.getHours();
    let m = pad(d.getMinutes());

    // pad with a 0
    h = pad(h);

    return `${h}:${m}`;
  };

  const getOptions = () => {
    let date = new Date();
    let options = [];

    // set to beginning of day
    date.setHours(0, 0, 0, 0);

    // loop through half hour increments
    for (let i = 0; i < 48; i++) {
      let time = new Date(date.getTime() + i * 1800000);
      let display = format(time);
      options.push(
        <option key={display} value={display}>
          {display}
        </option>
      );
    }

    return options;
  };

  const handleChange = e => {
    let date = e.target.value;
    onChange(date);
  };

  return (
    <select {...rest} onChange={handleChange} value={value}>
      {getOptions()}
    </select>
  );
};

TimeInput.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func
};

export default TimeInput;

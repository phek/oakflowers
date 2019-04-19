import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import "./Calendar.module.scss";

const localizer = BigCalendar.momentLocalizer(moment);

const events = [
  {
    start: new Date(),
    end: new Date(moment().add(1, "days")),
    title: "Some title"
  }
];

const Calendar = ({ height }) => {
  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      defaultDate={new Date()}
      defaultView="month"
      selectable
      onSelectSlot={() => console.log('selected')}
      style={{ height: height }}
    />
  );
};

Calendar.defaultProps = {
  height: "360px"
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      start: PropTypes.any,
      end: PropTypes.any,
      allDay: PropTypes.bool,
      resource: PropTypes.any
    })
  ),
  height: PropTypes.string
};

export default Calendar;

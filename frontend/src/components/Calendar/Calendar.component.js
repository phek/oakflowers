import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/sv";
import BigCalendar from "react-big-calendar";
import { getEvents, removeEvent } from "routes/_state/event/Event.actions";
import { getClosestInterval, getValidDate } from "./eventUtils";
import EventPopup from "./EventPopup";
import "./Calendar.module.scss";

moment.updateLocale("sv", {
  week: {
    dow: 1
  }
});

const localizer = BigCalendar.momentLocalizer(moment);

const Calendar = ({
  height,
  getEvents,
  removeEvent,
  events,
  user,
  authenticated
}) => {
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    getEvents();
  }, []);

  const onSelectEvent = event => {
    if (event.user === user.email) {
      removeEvent(event, user.token);
    }
  };

  const selectDate = event => {
    if (event && authenticated) {
      let startDate = event.start;
      let endDate = event.end;

      let startTime = moment(startDate).format("HH:mm");
      let endTime = moment(endDate).format("HH:mm");
      if (startTime === "00:00" && endTime === "00:00") {
        const time = getClosestInterval();
        startTime = time.startTime;
        endTime = time.endTime;
      }

      setSelectedDate(getValidDate(startDate, endDate, startTime, endTime));
    }
  };

  const unSelectDate = () => {
    setSelectedDate(null);
  };

  return (
    <>
      <BigCalendar
        localizer={localizer}
        formats={{
          timeGutterFormat: (date, culture, localizer) =>
            localizer.format(date, "HH:mm", culture),
          selectRangeFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, "HH:mm", culture)} - ${localizer.format(
              end,
              "HH:mm",
              culture
            )}`
        }}
        events={events}
        defaultDate={new Date()}
        defaultView="month"
        selectable
        views={["month", "week", "day"]}
        messages={{
          month: "Månad",
          week: "Vecka",
          day: "Dag",
          today: "Idag",
          previous: "Föregående",
          next: "Nästa"
        }}
        onSelectSlot={selectDate}
        onSelectEvent={onSelectEvent}
        style={{ height: height }}
      />
      {selectedDate && (
        <EventPopup closeFunction={unSelectDate} date={selectedDate} />
      )}
    </>
  );
};

Calendar.defaultProps = {
  height: "500px"
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      start: PropTypes.any,
      end: PropTypes.any,
      allDay: PropTypes.bool
    })
  ),
  height: PropTypes.string
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
  events: state.events.events
});

export default connect(
  mapStateToProps,
  { getEvents, removeEvent }
)(Calendar);

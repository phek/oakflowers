import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/sv";
import AwesomeCalendar from "./AwesomeCalendar";
import socketIO from "socket.io-client";
import { getEvents } from "routes/_state/event/Event.actions";
import { getValidDate } from "./calendarUtils";
import NewEventPopup from "./NewEventPopup";
import SelectedEventPopup from "./SelectedEventPopup";
import "./Calendar.module.scss";

moment.updateLocale("sv", {
  week: {
    dow: 1,
  },
});

function Calendar({ getEvents, events, user }) {
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedEvent, setSelectedEvent] = useState();

  useEffect(() => {
    const socket = socketIO(process.env.REACT_APP_SERVER_URL);
    socket.on("connect", () => {
      getEvents();
    });
    socket.on("newEvents", () => {
      getEvents();
    });
  }, [getEvents]);

  const onSelectEvent = (event) => {
    const foundEvent = events.filter(
      (currentEvent) => event === currentEvent.id
    )[0];

    if (user && foundEvent.user === user.email) {
      setSelectedEvent(foundEvent);
    }
  };

  const unSelectEvent = () => {
    setSelectedEvent(null);
  };

  const onSelectDate = (date) => {
    if (user) {
      const hour = Math.floor(date.hour);
      const minutes = (date.hour % 1).toFixed(1) === "0.5" ? 30 : 0;

      let startDate = new Date(
        date.year,
        date.month,
        date.day,
        hour,
        minutes,
        0
      );

      let endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add one hour

      let startTime = moment(startDate).format("HH:mm");
      let endTime = moment(endDate).format("HH:mm");

      setSelectedDate(getValidDate(startDate, endDate, startTime, endTime));
    }
  };

  const unSelectDate = () => {
    setSelectedDate(null);
  };

  return (
    <>
      <AwesomeCalendar
        ref={calendarRef}
        events={events}
        onClickTimeLine={onSelectDate}
        onClickEvent={onSelectEvent}
      />
      {selectedDate && (
        <NewEventPopup closeFunction={unSelectDate} date={selectedDate} />
      )}
      {selectedEvent && (
        <SelectedEventPopup
          closeFunction={unSelectEvent}
          event={selectedEvent}
        />
      )}
    </>
  );
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      from: PropTypes.any,
      start: PropTypes.any,
    })
  ),
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  events: state.events.events,
});

export default connect(mapStateToProps, { getEvents })(Calendar);

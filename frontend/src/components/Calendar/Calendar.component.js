import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/sv";
import BigCalendar from "react-big-calendar";
import socketIO from "socket.io-client";
import { getEvents } from "routes/_state/event/Event.actions";
import { getClosestInterval, getValidDate } from "./eventUtils";
import NewEventPopup from "./NewEventPopup";
import SelectedEventPopup from "./SelectedEventPopup";
import "./Calendar.module.scss";

moment.updateLocale("sv", {
  week: {
    dow: 1
  }
});

const localizer = BigCalendar.momentLocalizer(moment);

const Calendar = ({ getEvents, events, user }) => {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedEvent, setSelectedEvent] = useState();

  useEffect(() => {
    const socket = socketIO(process.env.REACT_APP_SERVER_URL);
    getEvents();
    socket.on("newEvents", () => {
      getEvents();
    });
  }, []);

  const onSelectEvent = event => {
    if (user && event.user === user.email) {
      setSelectedEvent(event);
    }
  };

  const unSelectEvent = () => {
    setSelectedEvent(null);
  };

  const onSelectDate = event => {
    if (event && user) {
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
        onSelectSlot={onSelectDate}
        onSelectEvent={onSelectEvent}
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
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      start: PropTypes.any,
      end: PropTypes.any,
      allDay: PropTypes.bool
    })
  )
};

const mapStateToProps = state => ({
  user: state.auth.user,
  events: state.events.events
});

export default connect(
  mapStateToProps,
  { getEvents }
)(Calendar);

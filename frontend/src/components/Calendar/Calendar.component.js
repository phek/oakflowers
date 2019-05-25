import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/sv";
import BigCalendar from "react-big-calendar";
import { getEvents, setEvent, removeEvent } from "routes/_state/event/Event.actions";
import Popup from "components/Popup";
import DateInput from "components/DateInput";
import TimeInput from "components/TimeInput";
import Button from "components/Button";
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
  setEvent,
  removeEvent,
  events,
  user,
  authenticated
}) => {
  const [selectedTitle, setSelectedTitle] = useState(""); // String
  const [selectedStartDate, setSelectedStartDate] = useState(); // Date
  const [selectedStartTime, setSelectedStartTime] = useState(); // Time String
  const [selectedEndDate, setSelectedEndDate] = useState(); // Date
  const [selectedEndTime, setSelectedEndTime] = useState(); // Time String

  useEffect(() => {
    getEvents();
  }, []);

  const addEvent = () => {
    const title = selectedTitle || "No Title";

    const startDate = moment(selectedStartDate);
    const startTime = moment(selectedStartTime, "HH:mm");
    const endDate = moment(selectedEndDate);
    const endTime = moment(selectedEndTime, "HH:mm");

    const start = startDate
      .set({
        hour: startTime.get("hour"),
        minute: startTime.get("minute")
      })
      .toDate();

    const end = endDate
      .set({
        hour: endTime.get("hour"),
        minute: endTime.get("minute")
      })
      .toDate();

    const newEvent = {
      title: title,
      start: start,
      end: end
    };
    if (authenticated && user) {
      setEvent(newEvent, user.token);
    }
    unSelectDate();
  };

  const getClosestInterval = () => {
    const currentTime = moment(new Date());
    const remainder = 30 - (currentTime.minute() % 30);
    let roundedTime = currentTime.add(remainder, "minutes");
    if (roundedTime.format("HH:mm") === "00:00") {
      roundedTime = roundedTime.subtract(1, "hours");
    }
    return {
      startTime: roundedTime.format("HH:mm"),
      endTime: roundedTime.add(1, "hours").format("HH:mm")
    };
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

      const newDate = getValidDate(startDate, endDate, startTime, endTime);

      if (user) {
        setSelectedTitle(`${user.firstname} ${user.lastname}`);
      }
      setSelectedStartDate(newDate.startDate);
      setSelectedEndDate(newDate.endDate);
      setSelectedStartTime(newDate.startTime);
      setSelectedEndTime(newDate.endTime);
    }
  };

  const unSelectDate = () => {
    setSelectedTitle("");
    setSelectedStartDate(undefined);
    setSelectedEndDate(undefined);
    setSelectedStartTime(undefined);
    setSelectedEndTime(undefined);
  };

  const getValidDate = (
    startDate,
    endDate,
    startTime,
    endTime,
    forward = true
  ) => {
    let newStartDate = moment(startDate);
    let newEndDate = moment(endDate);
    let newStartTime = moment(startTime, "HH:mm");
    let newEndTime = moment(endTime, "HH:mm");

    /* If end date is before start date, set it to same date */
    if (newEndDate < newStartDate) {
      if (forward) {
        newEndDate = newStartDate;
      } else {
        newStartDate = newEndDate;
      }
    }

    /* If same date but end time is before start time, set time between to one hour */
    if (
      newStartDate.isSame(newEndDate) &&
      newEndTime.format("HH:mm") <= newStartTime.format("HH:mm")
    ) {
      if (forward) {
        newEndTime = moment(newStartTime).add(1, "hours");
      } else {
        newStartTime = moment(newEndTime).subtract(1, "hours");
      }
    }

    /* If new time is past twelve o'clock, set date to other day */
    if (newEndTime.format("HH:mm") < newStartTime.format("HH:mm")) {
      if (forward) {
        newEndDate = moment(newStartDate).add(1, "days");
      } else {
        newStartDate = moment(newEndDate).subtract(1, "days");
      }
    }

    return {
      startDate: newStartDate.toDate(),
      endDate: newEndDate.toDate(),
      startTime: newStartTime.format("HH:mm"),
      endTime: newEndTime.format("HH:mm")
    };
  };

  const onTitleChange = event => setSelectedTitle(event.target.value);
  const onDateChange = ({ startDate, endDate, startTime, endTime }) => {
    let forward = true;
    if (endDate || endTime) {
      forward = false;
    }
    const newDate = getValidDate(
      startDate || selectedStartDate,
      endDate || selectedEndDate,
      startTime || selectedStartTime,
      endTime || selectedEndTime,
      forward
    );
    setSelectedStartDate(newDate.startDate);
    setSelectedEndDate(newDate.endDate);
    setSelectedStartTime(newDate.startTime);
    setSelectedEndTime(newDate.endTime);
  };

  const onSelectEvent = event => {
    removeEvent(event, user.token);
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
      {selectedStartDate && (
        <Popup closeFunction={unSelectDate}>
          <label htmlFor="title">Event name</label>
          <input
            id="title"
            placeholder="Titel"
            value={selectedTitle}
            onChange={onTitleChange}
          />
          <label htmlFor="start">Start date</label>
          <DateInput
            id="start"
            style={{ marginRight: 8 }}
            value={selectedStartDate}
            onDayChange={date => onDateChange({ startDate: date })}
          />
          <TimeInput
            value={selectedStartTime}
            onChange={time => onDateChange({ startTime: time })}
          />
          <label htmlFor="end">End date</label>
          <DateInput
            id="end"
            style={{ marginRight: 8 }}
            value={selectedEndDate}
            onDayChange={date => onDateChange({ endDate: date })}
          />
          <TimeInput
            value={selectedEndTime}
            onChange={time => onDateChange({ endTime: time })}
          />
          <div style={{ marginTop: 8 }}>
            <Button color="black-light" size="s" onClick={addEvent}>
              Boka
            </Button>
          </div>
        </Popup>
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
  { getEvents, setEvent, removeEvent }
)(Calendar);

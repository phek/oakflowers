import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { setEvent } from "routes/_state/event/Event.actions";
import { getValidDate } from "../eventUtils";
import Popup from "components/Popup";
import DateInput from "components/DateInput";
import TimeInput from "components/TimeInput";
import Button from "components/Button";

const EventPopup = ({ setEvent, closeFunction, user, authenticated, date }) => {
  const [selectedTitle, setSelectedTitle] = useState(
    user ? `${user.firstname} ${user.lastname}` : undefined
  );
  const [selectedStartDate, setSelectedStartDate] = useState(
    date ? date.startDate : undefined
  );
  const [selectedStartTime, setSelectedStartTime] = useState(
    date ? date.startTime : undefined
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    date ? date.endDate : undefined
  );
  const [selectedEndTime, setSelectedEndTime] = useState(
    date ? date.endTime : undefined
  );

  const addEvent = e => {
    e.preventDefault();

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
    closeFunction();
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

  return (
    <Popup closeFunction={closeFunction}>
      <form onSubmit={addEvent}>
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
          <Button color="black-light" size="s">
            Boka
          </Button>
        </div>
      </form>
    </Popup>
  );
};

EventPopup.propTypes = {
  closeFunction: PropTypes.func,
  date: PropTypes.object
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { setEvent }
)(EventPopup);

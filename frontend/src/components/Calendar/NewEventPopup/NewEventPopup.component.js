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
import Text from "components/Text";

const NewEventPopup = ({ setEvent, closeFunction, user, date }) => {
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
  const [error, setError] = useState();

  const addEvent = e => {
    e.preventDefault();

    let eventError;
    const title = selectedTitle || "No Title";
    const startDate = moment(selectedStartDate);
    const startTime = moment(selectedStartTime, "HH:mm");
    const endDate = moment(selectedEndDate);
    const endTime = moment(selectedEndTime, "HH:mm");

    const startHour = startTime.get("hour");
    const startMinute = startTime.get("minute");

    const endHour = endTime.get("hour");
    const endMinute = endTime.get("minute");

    const start = startDate.set({
      hour: startHour,
      minute: startMinute
    });

    const end = endDate.set({
      hour: endHour,
      minute: endMinute
    });

    const newEvent = {
      title: title,
      start: start.toDate(),
      end: end.toDate()
    };

    if (!user) {
      eventError = "Du är ej inloggad.";
    }

    if (end.diff(start, "minutes", true) > 120) {
      eventError = "Du får max boka 2 timmar åt gången.";
    }

    if (startHour < 9 || endHour > 21) {
      eventError = "Du får endast boka tider mellan 09:00-21:00";
    } 

    if (eventError) {
      setError(eventError);
    } else {
      setEvent(newEvent, user.token).then(error => {
        if (error) {
          setError(error);
        } else {
          closeFunction();
        }
      });
    }
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
        {error && (
          <Text style={{ marginTop: 8 }} color="negative">
            {error}
          </Text>
        )}
      </form>
    </Popup>
  );
};

NewEventPopup.propTypes = {
  closeFunction: PropTypes.func,
  date: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { setEvent }
)(NewEventPopup);

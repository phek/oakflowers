import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { removeEvent } from "routes/_state/event/Event.actions";
import { getValidDate } from "../eventUtils";
import Popup from "components/Popup";
import DateInput from "components/DateInput";
import TimeInput from "components/TimeInput";
import Button from "components/Button";
import Text from "components/Text";

const SelectedEventPopup = ({ removeEvent, closeFunction, user, event }) => {
  const [selectedTitle, setSelectedTitle] = useState(
    event ? event.title : undefined
  );
  const [selectedStartDate, setSelectedStartDate] = useState(
    event ? event.start : undefined
  );
  const [selectedStartTime, setSelectedStartTime] = useState(
    event ? moment(event.start).format("HH:mm") : undefined
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    event ? event.end : undefined
  );
  const [selectedEndTime, setSelectedEndTime] = useState(
    event ? moment(event.end).format("HH:mm") : undefined
  );
  const [error, setError] = useState();

  const deleteEvent = () => {
    if (user) {
      removeEvent(event, user.token).then(error => {
        if (error) {
          setError(error);
        } else {
          closeFunction();
        }
      });
    } else {
      setError("Ej inloggad.");
    }
  };

  const editEvent = e => {
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

    // Edit event
    console.log(newEvent);
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
      <form onSubmit={editEvent}>
        <label htmlFor="title">Event name</label>
        <input
          disabled
          id="title"
          placeholder="Titel"
          value={selectedTitle}
          onChange={onTitleChange}
        />
        <label htmlFor="start">Start date</label>
        <DateInput
          inputProps={{ disabled: true }}
          id="start"
          style={{ marginRight: 8 }}
          value={selectedStartDate}
          onDayChange={date => onDateChange({ startDate: date })}
        />
        <TimeInput
          disabled
          value={selectedStartTime}
          onChange={time => onDateChange({ startTime: time })}
        />
        <label htmlFor="end">End date</label>
        <DateInput
          inputProps={{ disabled: true }}
          id="end"
          style={{ marginRight: 8 }}
          value={selectedEndDate}
          onDayChange={date => onDateChange({ endDate: date })}
        />
        <TimeInput
          disabled
          value={selectedEndTime}
          onChange={time => onDateChange({ endTime: time })}
        />
        <div style={{ marginTop: 8 }}>
          <Button type="button" color="negative" size="s" onClick={deleteEvent}>
            Ta bort event
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

SelectedEventPopup.propTypes = {
  closeFunction: PropTypes.func,
  event: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { removeEvent }
)(SelectedEventPopup);

import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import DateInput from "react-day-picker/DayPickerInput";
import Popup from "components/Popup";
import "./DateInput.module.scss";
import "./Calendar.module.scss";

const localizer = BigCalendar.momentLocalizer(moment);

const defaultEvents = [
  {
    id: "test",
    start: new Date(),
    end: new Date(moment().add(1, "days")),
    title: "Some title"
  }
];

const Calendar = ({ height }) => {
  const [events, setEvents] = useState(defaultEvents);
  const [selectedEvent, setSelectedEvent] = useState();

  const addEvent = selectedDate => {
    const newEvent = {
      id: "test",
      title: "Some title",
      start: selectedDate.start,
      end: selectedDate.end
    };
    setEvents(events.concat(newEvent));
  };
  
  console.log(selectedEvent);

  return (
    <>
      <BigCalendar
        localizer={localizer}
        events={events}
        defaultDate={new Date()}
        defaultView="month"
        selectable
        views={["month", "week", "day"]}
        onSelectSlot={setSelectedEvent}
        onSelectEvent={data => console.log(data)}
        style={{ height: height }}
      />
      {selectedEvent && (
        <Popup closeFunction={() => setSelectedEvent(null)}>
          <DateInput value={selectedEvent.start} />
          <DateInput value={selectedEvent.end} />
        </Popup>
      )}
    </>
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
      allDay: PropTypes.bool
    })
  ),
  height: PropTypes.string
};

export default Calendar;

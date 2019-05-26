import axios from "axios";

export const RECIEVED_EVENTS = "recieved_events";
export const ADDED_EVENT = "added_event";
export const REMOVED_EVENT = "removed_event";
export const EVENTS_ERROR = "events_error";

export function getEvents() {
  return async dispatch => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/get/events`
      );

      dispatch({
        type: RECIEVED_EVENTS,
        events: convertEvents(res.data.events)
      });
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        error: "Unable to get events"
      });
    }
  };
}

export function setEvent(event, token) {
  return async dispatch => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/set/event`,
        {
          event,
          token
        }
      );

      dispatch({
        type: ADDED_EVENT,
        event: { _id: res.data.eventId, user: res.data.userEmail, ...event }
      });
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        error: "Unable to set event"
      });
    }
  };
}

export function removeEvent(event, token) {
  return async dispatch => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/remove/event`, {
        data: { event, token }
      });

      dispatch({
        type: REMOVED_EVENT,
        event: event
      });
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        error: "Unable to remove event"
      });
    }
  };
}

function convertEvents(events) {
  let newEvents = [];
  for (let event of events) {
    newEvents.push({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    });
  }

  return newEvents;
}

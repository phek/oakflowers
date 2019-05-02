import axios from "axios";

export const RECIEVED_EVENTS = "recieved_events";
export const EVENTS_ERROR = "events_error";

export function getEvents() {
  return async dispatch => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/get/events`);

      dispatch({
        type: RECIEVED_EVENTS,
        payload: convertEvents(res.data.events)
      });
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        payload: "Unable to get events"
      });
    }
  };
}

export function setEvent(event, token) {
  return async dispatch => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/set/event`, { event, token });

      dispatch({
        type: RECIEVED_EVENTS,
        payload: convertEvents(res.data.events)
      });
    } catch (error) {
      dispatch({
        type: EVENTS_ERROR,
        payload: "Unable to set event"
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

import axios from "axios";

export const RECIEVED_EVENTS = "recieved_events";
export const EVENTS_ERROR = "events_error";

export function getEvents(token) {
  console.log("Called getEvents()");
  return async dispatch => {
    try {
      const res = await axios.get(`/api/get/events`, { params: { token } });

      dispatch({
        type: RECIEVED_EVENTS,
        payload: convertEvents(res.data.events)
      });
    } catch (error) {
      console.log(error);
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
      const res = await axios.post(`/api/set/event`, { event, token });

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

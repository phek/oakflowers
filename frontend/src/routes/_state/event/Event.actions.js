import axios from "axios";
import { convertEvents } from "utils/eventUtils";

export const RECIEVED_EVENTS = "recieved_events";
export const ADDED_EVENT = "added_event";
export const REMOVED_EVENT = "removed_event";
export const EVENTS_ERROR = "events_error";

export function getEvents() {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/get/events`
      );

      dispatch({
        type: RECIEVED_EVENTS,
        events: convertEvents(res.data.events),
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return "Ett fel uppstod.";
      }
    }
  };
}

export function setEvent(event, token) {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/set/event`,
        {
          event,
          token,
        }
      );

      dispatch({
        type: ADDED_EVENT,
        event: { _id: res.data.eventId, user: res.data.userEmail, ...event },
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return "Ett fel uppstod.";
      }
    }
  };
}

export function removeEvent(event, token) {
  return async (dispatch) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/remove/event`,
        {
          headers: {
            Authorization: token,
          },
          params: { eventId: event.id },
        }
      );

      dispatch({
        type: REMOVED_EVENT,
        event: event,
      });
    } catch (error) {
      return error;
    }
  };
}

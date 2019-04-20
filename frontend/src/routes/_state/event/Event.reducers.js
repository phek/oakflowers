import { RECIEVED_EVENTS, EVENTS_ERROR } from "./Event.actions";

const initState = {
  events: [],
  error: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case RECIEVED_EVENTS:
      return { ...state, events: action.payload };
    case EVENTS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

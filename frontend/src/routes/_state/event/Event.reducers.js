import { RECIEVED_EVENTS, ADDED_EVENT, REMOVED_EVENT, EVENTS_ERROR } from "./Event.actions";

const initState = {
  events: [],
  error: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case RECIEVED_EVENTS:
      return { ...state, events: action.events };
    case ADDED_EVENT:
      return {...state, events: [...state.events, action.event ]};
    case REMOVED_EVENT:
      const newEvents = state.events.filter(event => event._id !== action.event._id);
      return {...state, events: newEvents};
    case EVENTS_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}

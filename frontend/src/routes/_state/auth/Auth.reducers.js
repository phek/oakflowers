import { AUTHENTICATED, UNAUTHENTICATED } from "./Auth.actions";

const initState = {
  user: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        user: action.payload
      };
    case UNAUTHENTICATED:
      return { ...state, user: null };
    default:
      return state;
  }
}

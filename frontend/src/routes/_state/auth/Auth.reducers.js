import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR
} from "./Auth.actions";

const initState = {
  authenticated: false,
  user: null,
  error: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        error: null
      };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false, user: null, error: null };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

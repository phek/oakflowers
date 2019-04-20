import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR
} from "./Auth.actions";

const initState = {
  authenticated: false,
  error: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return { ...state, authenticated: true, token: action.payload };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

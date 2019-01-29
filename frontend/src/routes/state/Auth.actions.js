import axios from "axios";

export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";

const URL = "http://www.sample-website.com";

export function signIn({ email, password }, history) {
  return async dispatch => {
    try {
      // const res = await axios.post(`${URL}/signin`, { email, password });

      dispatch({ type: AUTHENTICATED });
      localStorage.setItem("user", email);
    } catch (error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: "Invalid email or password"
      });
    }
  };
}

export function signOut() {
  localStorage.removeItem("user");
  return {
    type: UNAUTHENTICATED
  };
}

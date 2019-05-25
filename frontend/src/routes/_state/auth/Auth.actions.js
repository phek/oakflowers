import axios from "axios";

export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";

export function login({ email, password }, callback) {
  return async dispatch => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });
      const user = res.data.user;

      dispatch({ type: AUTHENTICATED, payload: user });
      localStorage.setItem("user", JSON.stringify(user));

      if (typeof callback === "function") {
        callback();
      }
    } catch (error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: "Invalid email or password"
      });
    }
  };
}

export function logout() {
  localStorage.removeItem("user");
  return {
    type: UNAUTHENTICATED
  };
}

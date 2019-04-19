import axios from "axios";

export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";

export function login({ email, password }, history) {
  return async dispatch => {
    try {
      const res = await axios.post(`api/login`, { email, password });

      dispatch({ type: AUTHENTICATED });
      localStorage.setItem("user", res.token);
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

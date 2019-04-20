import axios from "axios";

export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";

export function login({ email, password }) {
  return async dispatch => {
    try {
      const res = await axios.post(`/api/login`, { email, password });
      const token = res.data.token;

      dispatch({ type: AUTHENTICATED, payload: token });
      localStorage.setItem("user", token);
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

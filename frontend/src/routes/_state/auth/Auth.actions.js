import axios from "axios";

export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";

export function login({ email, password }) {
  return async dispatch => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
        email,
        password
      });
      const user = res.data.user;

      dispatch({ type: AUTHENTICATED, payload: user });
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      if (error.response) {
        return "Fel användarnamn eller lösenord.";
      } else {
        return "Ett fel uppstod.";
      }
    }
  };
}

export function logout() {
  localStorage.removeItem("user");
  return {
    type: UNAUTHENTICATED
  };
}

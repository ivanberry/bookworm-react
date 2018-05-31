import api from "../api";
import { userLoggedIn } from "./auth";

export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.setItem("bookwormJWT", user.token);
    dispatch(userLoggedIn(user));
  });

export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.setItem("bookwormJWT", user.token);
    dispatch(userLoggedIn(user));
  });

// send the email to server and request a reset password uri, this does nothing to the redux store
export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

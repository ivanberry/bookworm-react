import api from "../api";
import { userLoggedIn } from "./auth";

/* eslint-disable */
export const signup = data => dispatch => {
  return api.user.signup(data).then(user => {
    localStorage.setItem("bookwormJWT", user.token);
    dispatch(userLoggedIn(user));
  });
};

export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.setItem("bookwormJWT", user.token);
    dispatch(userLoggedIn(user));
  });

export const resetPass = data => dispatch =>
  api.user.resetPass(data).then(user => {
    localStorage.setItem("bookworm", user.token);
    dispatch(userLoggedIn(user));
  });

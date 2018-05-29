import api from "../api";
import { userLoggedIn } from "./auth";

/* eslint-disable */
export const signup = data => dispatch => {
  return api.user.signup(data).then(user => {
    localStorage.setItem("bookwormJWT", user.token);
    dispatch(userLoggedIn(user));
  });
};

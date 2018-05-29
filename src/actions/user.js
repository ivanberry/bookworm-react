import api from "../api";
import { userLoggedIn } from "./auth";

/* eslint-disable */
export const signup = data => dispatch => {
  api.user.signup(data).then(data => dispatch(userLoggedIn(data)));
};

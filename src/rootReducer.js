import { combineReducers } from "redux";
import user from "./reducers/user";
import book from "./reducers/book";

export default combineReducers({
  user,
  book
});

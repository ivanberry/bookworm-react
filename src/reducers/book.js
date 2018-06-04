import { createSelector } from "reselect";
import { BOOKS_FETCHED } from "../types";

export default function book(state = {}, action = {}) {
  switch (action.type) {
    case BOOKS_FETCHED:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
}

export const bookSelector = state => state.book;

export const allBookSelector = createSelector(bookSelector, bookHash =>
  Object.values(bookHash)
);

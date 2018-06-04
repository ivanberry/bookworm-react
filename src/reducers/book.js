import { createSelector } from "reselect";
import { BOOKS_FETCHED, BOOK_CREATED } from "../types";

export default function book(state = {}, action = {}) {
  switch (action.type) {
    case BOOKS_FETCHED:
    case BOOK_CREATED:
      return {
        ...state,
        ...action.data.entities.books
      };
    default:
      return state;
  }
}

export const bookSelector = state => state.book;

export const allBookSelector = createSelector(bookSelector, bookHash =>
  Object.values(bookHash)
);

import { createSelector } from "reselect";

export default function book(state = {}, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const bookSelector = state => state.book;

export const allBookSelector = createSelector(bookSelector, bookHash =>
  Object.values(bookHash)
);

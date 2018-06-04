import { normalize } from "normalizr";
import { BOOKS_FETCHED } from "../types";
import api from "../api";
import { bookSchema } from "../schemas";

function booksFetched(data) {
  return {
    type: BOOKS_FETCHED,
    data
  };
}

/* eslint-disable */
export const addNewBook = data => dispatch => {
  api.books.addNewBook(data).then(book => dispatch(addNewBookAction(book)));
};

export const fetchBooks = () => dispatch => {
  api.books.fetchAll().then(books => {
    dispatch(booksFetched(normalize(books, [bookSchema])));
  });
};

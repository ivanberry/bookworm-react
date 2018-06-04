import { normalize } from "normalizr";
import api from "../api";
import { BOOKS_FETCHED, BOOK_CREATED } from "../types";
import { bookSchema } from "../schemas";

function booksFetched(data) {
  return {
    type: BOOKS_FETCHED,
    data
  };
}

function bookCreated(data) {
  return {
    type: BOOK_CREATED,
    data
  };
}

export const createBook = data => dispatch => {
  api.books
    .create(data)
    .then(book => dispatch(bookCreated(normalize(book), bookSchema)));
};

export const fetchBooks = () => dispatch => {
  api.books.fetchAll().then(books => {
    dispatch(booksFetched(normalize(books, [bookSchema])));
  });
};

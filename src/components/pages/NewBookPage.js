import React, { Component } from "react";
import axiox from "axios";
import { Segment } from "semantic-ui-react";
import SearchBookForm from "../forms/SearchBookForm";
import BookForm from "../forms/BookForm";

class NewBookPage extends Component {
  state = {
    book: null
  };

  // TODO: after selected fetch the book detail
  onBookSelect = book => {
    this.setState({ book });
    axiox
      .get(`/api/books/fetchPage?goodreadsId=${book.goodreadsId}`)
      .then(res => res.data.page)
      .then(page => {
        // TODO: why this setState won't make BookForm re-render?
        this.setState({ book: { ...book, page } });

        // How to set a state doest not exist in state?
        // this.setState({ book: { ...book }, page });
      });
  };

  /**
   * BOOK_ADD action
   */
  addBook = () => console.log("book added");

  render() {
    const { book } = this.state;
    return (
      <Segment>
        <h1>Add new books</h1>
        <SearchBookForm onBookSelect={this.onBookSelect} />
        {book && <BookForm submit={this.addBook} book={book} />}
      </Segment>
    );
  }
}

export default NewBookPage;

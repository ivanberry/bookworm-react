import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import SearchBookForm from "../forms/SearchBookForm";
import BookForm from "../forms/BookForm";

class NewBookPage extends Component {
  state = {
    book: null
  };

  onBookSelect = book => this.setState({ book });

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

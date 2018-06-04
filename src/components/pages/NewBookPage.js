import React, { Component } from "react";
import axiox from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import SearchBookForm from "../forms/SearchBookForm";
import BookForm from "../forms/BookForm";
import { createBook } from "../../actions/books";

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
        this.setState({ book: { ...book, page } });
      });
  };

  /**
   * BOOK_ADD action
   */
  addBook = book =>
    this.props
      .createBook(book)
      .then(() => this.props.history.push("/dashboard"));

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

NewBookPage.propTypes = {
  createBook: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { createBook })(NewBookPage);

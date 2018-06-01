import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Dropdown } from "semantic-ui-react";
import Axios from "axios";

class SearchBookForm extends Component {
  state = {
    books: null,
    query: "",
    loading: false,
    options: []
  };

  /**
   * data: all props of dropdown
   */
  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({ query: data.searchQuery });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    Axios.get(`/api/books/search?q=${this.state.query}`)
      .then(res => res.data.books)
      .then(books => {
        const options = [];
        const bookHash = {};
        books.forEach(book => {
          bookHash[book.goodreadsId] = book; // cache the fetch data
          options.push({
            key: book.goodreadsId,
            value: book.goodreadsId,
            text: book.title
          });
        });
      });
  };

  render() {
    return (
      <Segment>
        <p>Search books what you want.</p>
        <Dropdown
          fluid
          search
          placeholder="Filter books"
          loading={this.state.loading}
          options={this.state.options}
          onSearchChange={this.onSearchChange}
        />
      </Segment>
    );
  }
}

SearchBookForm.propTypes = {};

export default SearchBookForm;

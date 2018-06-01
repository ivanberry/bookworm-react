import React, { Component } from "react";
import { Segment, Dropdown } from "semantic-ui-react";
import Axios from "axios";
import PropTypes from "prop-types";

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
    this.setState({ loading: true, query: "" });
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
        this.setState({ loading: false, options, books: bookHash });
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
          value={this.state.query}
          loading={this.state.loading}
          options={this.state.options}
          onSearchChange={this.onSearchChange}
          onClick={this.props.onBookClick}
        />
      </Segment>
    );
  }
}

SearchBookForm.propTypes = {
  onBookClick: PropTypes.func.isRequired
};

export default SearchBookForm;

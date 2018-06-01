import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import SearchBookForm from "../forms/SearchBookForm";

class NewBookPage extends Component {
  state = {
    book: null
  };

  onBookSelect = book => this.setState({ book });

  render() {
    return (
      <Segment>
        <h1>Add new books</h1>
        <SearchBookForm onBookSelect={this.onBookSelect} />
      </Segment>
    );
  }
}

export default NewBookPage;

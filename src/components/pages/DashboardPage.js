import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBookSelector } from "../../reducers/book";
import AddBookCtA from "../ctas/AddBookCtA";
import { fetchBooks } from "../../actions/books";

class DashboardPage extends Component {
  // fetch all books once component did mount
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { isConfirmed, books } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        {books.length === 0 ? <AddBookCtA /> : "You have books!"}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      page: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  fetchBooks: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirm,
    books: allBookSelector(state)
  };
}

export default connect(mapStateToProps, { fetchBooks })(DashboardPage);

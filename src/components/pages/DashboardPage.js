import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBookSelector } from "../../reducers/book";
import AddBookCtA from "../ctas/AddBookCtA";

const DashboardPage = ({ isConfirmed, books }) => (
  <div>
    {!isConfirmed && <ConfirmEmailMessage />}
    {books.length === 0 && <AddBookCtA />}
  </div>
);

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirm,
    books: allBookSelector(state)
  };
}

export default connect(mapStateToProps)(DashboardPage);

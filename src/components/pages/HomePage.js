import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const HomePage = ({ isAuthenticated }) => (
  <div>
    <h1>Home Page</h1>
    {isAuthenticated ? <button>Logout</button> : <Link to="login">Login</Link>}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps)(HomePage);

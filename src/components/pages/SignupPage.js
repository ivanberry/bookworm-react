import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signup } from "../../actions/user";
import SignupForm from "../forms/SignupForm";

class SignupPage extends Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  signup: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { signup })(SignupPage);

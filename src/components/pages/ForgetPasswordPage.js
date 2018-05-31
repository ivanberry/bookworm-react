import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import ForgetPasswordForm from "../forms/ForgetPasswordForm";
import { resetPasswordRequest } from "../../actions/user";

class ResetPassPage extends Component {
  state = {
    success: false
  };

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() {
    return (
      <div>
        {this.state.success ? (
          <Message>Email has been sent.</Message>
        ) : (
          <ForgetPasswordForm submit={this.submit} />
        )}
      </div>
    );
  }
}

ResetPassPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ResetPassPage);

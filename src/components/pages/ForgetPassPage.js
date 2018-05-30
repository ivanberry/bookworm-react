import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ForgetForm from "../forms/ForgetForm";
import { resetPass } from "../../actions/user";

class ForgetPassPage extends Component {
  /**
   * 0. reset password -->
   * 1. action call -->
   * 2. api call -->
   * 3. api call returns promise <--
   * 4. ation dispatch <--
   * 5. component state change <--
   * 6. ui change
   */
  submit = data =>
    this.props.resetPass(data).then(this.props.history.push("/dashboard"));

  render() {
    return (
      <div>
        <h1>Reset password</h1>
        <ForgetForm submit={this.submit} />
      </div>
    );
  }
}

ForgetPassPage.propTypes = {
  resetPass: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { resetPass })(ForgetPassPage);

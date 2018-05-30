import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { confirm } from "../../actions/user";

class ConfirmationPage extends Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    /**
     * 0. once did mount, call confirm
     * 1. action to send token to api
     * 2. send token to endpoint and send back user data
     * 3, if success, change component states
     * 4, or also change some states
     */
    this.props
      .confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;
    return (
      <div>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your email.</Message.Header>
          </Message>
        )}

        {!loading &&
          success && (
            <Message success icon>
              <Icon name="checkmark" />
              <Message.Header>
                Thank you. You account has been verified.
                <Link to="/dashboard">Go to your dashboard</Link>
              </Message.Header>
            </Message>
          )}

        {!loading &&
          !success && (
            <Message icon>
              <Icon name="signal" />
              <Message>Oooops, Email verified failed.</Message>
            </Message>
          )}
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);

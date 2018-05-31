import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineError from "../messages/InlineError";

class ResetPasswordForm extends Component {
  state = {
    data: {
      password: "",
      passwordConfirm: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });

  onsubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(err => {
        this.setState({ errors: err.response.data.errors, loading: false });
      });
    }
  };
  validate = data => {
    const errors = {};
    // validate data will sent to server
    if (!data.password) errors.password = "Password can't be blank";
    if (!data.passwordConfirm) errors.passwordConfirm = "Confirm password.";
    if (data.password !== data.passwordConfirm)
      errors.passwordConfirm = "Passwords must be same.";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onsubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something going wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field error={!!errors.passwordConfirm}>
          <label htmlFor="passwordConfirm">Confirm</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={data.passwordConfirm}
            onChange={this.onChange}
          />
          {errors.passwordConfirm && (
            <InlineError text={errors.passwordConfirm} />
          )}
        </Form.Field>
        <Button primary>Reset</Button>
      </Form>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ResetPasswordForm;

import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class ResetPassForm extends Component {
  state = {
    data: {
      email: "",
      password: "",
      new_password: "",
      same_password: ""
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
    if (!isEmail(data.email)) errors.email = "Invalid Email";
    if (!data.password) errors.password = "Cant be blank";
    if (!data.new_password) errors.new_password = "New password cant be blank";
    if (data.password === data.new_password && data.password !== "")
      errors.same_password = "The passwords cant be same";
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
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password || !!errors.same_password}>
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
        {/* new password field */}
        <Form.Field error={!!errors.new_password || !!errors.same_password}>
          <label htmlFor="new_password">New password</label>
          <input
            type="password"
            id="new_password"
            name="new_password"
            value={data.new_password}
            onChange={this.onChange}
          />
          {errors.new_password && <InlineError text={errors.new_password} />}
        </Form.Field>
        <p>
          {errors.same_password && <InlineError text={errors.same_password} />}
        </p>
        <Button primary>Reset</Button>
      </Form>
    );
  }
}

ResetPassForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ResetPassForm;

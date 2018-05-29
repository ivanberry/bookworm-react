import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import Validate from "validator";
import InlineError from "../messages/InlineError";

class SignupForm extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {},
    loading: false
  };

  onChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  onsubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!Validate.isEmail(data.email)) errors.email = "Invalid Email";
    if (!data.password) errors.password = "Cant be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.props.submit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something going wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={data.email}
            name="email"
            placeholder="example@example.com"
            onChange={this.onChange}
          />
        </Form.Field>
        {errors.email && <InlineError text="Invalid email address!" />}
        <Form.Field>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={data.password}
            name="password"
            onChange={this.onChange}
          />
        </Form.Field>
        {errors.password && <InlineError text="password cant't be blank" />}
        <Button primary>Sigup</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;

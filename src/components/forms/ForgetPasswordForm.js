import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";

class ForgetPasswordForm extends Component {
  state = {
    data: {
      email: ""
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
        <Button primary>Reset</Button>
      </Form>
    );
  }
}

ForgetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgetPasswordForm;

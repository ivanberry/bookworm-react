import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Validate from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        email: '',
        password: ''
      },
      loading: false,
      errors: {}
    }
  }

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value }
  });

  onsubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({errors});
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    }
  };
  validate = (data) => {
    const errors = {};
    if(!Validate.isEmail(data.email)) errors.email = 'Invalid Email';
    if (!data.password) errors.password = 'Cant be blank';
    return errors;
  }

  render() {
    const { data, errors } = this.state;
    return (
      <Form onSubmit={this.onsubmit}>
        <Form.Field error={!!errors.email}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='example@example.com'
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text='Invalid Email' />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text='Password cant be blank' />}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginForm;
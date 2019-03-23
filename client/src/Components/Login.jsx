import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/auth/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then((res) => {
        if (res.data.type === 'error') {
          console.log('Error: ', res.data.message);
          this.setState({ message: res.data.message });
        } else {
          localStorage.setItem('mernToken', res.data.token);
          this.props.liftToken(res.data);
        }
      })
      .catch((err) => {
        this.setState({
          message:
            'Maximum login attempts exceeded. Please try again later.'
        });
      });
  };

  render() {
    return (
      <div className='Login'>
        <h2>Login to your account:</h2>

        <form onSubmit={this.handleSubmit}>
          <small>{this.state.message}</small>

          <input
            value={this.state.email}
            onChange={this.handleEmailChange}
            type='email'
            name='email'
            placeholder='Email...'
          />

          <input
            value={this.state.password}
            onChange={this.handlePasswordChange}
            type='password'
            name='password'
            placeholder='Password...'
          />

          <input className='button' type='submit' value='Log In!' />
        </form>
      </div>
    );
  }
}

export default Login;

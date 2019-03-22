import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      message: ''
    };
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/auth/signup', {
        name: this.state.name,
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
            'Maximum accounts exceeded. Please try again later.'
        });
      });
  };

  render() {
    return (
      <div className='Signup'>
        <h2>Create a New Account:</h2>
        <small>{this.state.message}</small>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.name}
            onChange={this.handleNameChange}
            type='text'
            name='name'
            placeholder='Your name...'
          />
          <br />
          <input
            value={this.state.email}
            onChange={this.handleEmailChange}
            type='email'
            name='email'
            placeholder='Your email...'
          />
          <br />
          <input
            value={this.state.password}
            onChange={this.handlePasswordChange}
            type='password'
            name='password'
            placeholder='Enter password...'
          />
          <br />
          <input type='submit' value='Sign up!' />
        </form>
        <hr />
      </div>
    );
  }
}

export default Signup;

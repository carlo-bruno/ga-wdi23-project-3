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

  handleCityChange = (e) => {
    this.setState({
      city: e.target.value
    });
  };

  handleZipcodeChange = (e) => {
    this.setState({
      zipcode: e.target.value
    });
  };
  handleStateChange = (e) => {
  this.setState({
    stateName: e.target.value
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
      password: this.state.password,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode
      
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
          <label htmlFor='name'>Name:</label>
          <input
            value={this.state.name}
            onChange={this.handleNameChange}
            type='text'
            name='name'
            placeholder='User Example'
          />

          <label htmlFor='city'>City:</label>
          <input 
          value={this.state.city}
          onChange={this.handle}
          type='text'
          name='city'
          placeholder='Seattle'
          />

          <label htmlFor='stateName'>State:</label>
          <input 
          value={this.state.stateName}
          onChange={this.handle}
          type='text'
          name='stateName'
          placeholder='WA'
          />

          <label htmlFor='zipcode'>Zipcode:</label>
          <input 
          value={this.state.zipcode}
          onChange={this.handle}
          type='text'
          name='zipcode'
          pattern= '[0-9]*'
          placeholder='55404'
          />
          
          <label htmlFor='email'>Email:</label>
          <input
            value={this.state.email}
            onChange={this.handleEmailChange}
            type='email'
            name='email'
            placeholder='user@example.com'
          />

          <label htmlFor='password'>Password:</label>
          <input
            value={this.state.password}
            onChange={this.handlePasswordChange}
            type='password'
            name='password'
            placeholder='at least 8 characters'
          />
          <input
            className='btn'
            type='submit'
            value='Sign up!'
          />
        </form>
      </div>
    );
  } 
}

export default Signup;

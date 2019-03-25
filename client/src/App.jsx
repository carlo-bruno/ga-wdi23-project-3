import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import MenuBar from './Components/MenuBar';
import Header from './Components/Header';

import LandingPage from './Pages/LandingPage';
import Profile from './Pages/Profile';
import UpdateProfile from './Pages/UpdateProfile';
import Events from './Pages/Events';
import EventShow from './Pages/EventShow';
// InOffice
import Representative from './Pages/Representative';
import Elections from './Pages/Elections';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      lockedResult: ''
    };
  }

  checkForLocalToken = () => {
    let token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      localStorage.removeItem('mernToken');
      this.setState({ token: '', user: null });
    } else {
      axios.post('/auth/me/from/token', { token }).then((res) => {
        if (res.data.type === 'error') {
          localStorage.removeItem('mernToken');
          this.setState({ message: res.data.message });
        } else {
          localStorage.setItem('mernToken', res.data.token);
          this.setState({
            token: res.data.token,
            user: res.data.user
          });
        }
      });
    }
  };

  liftTokenToState = (data) => {
    this.setState({ token: data.token, user: data.user });
  };

  logout = () => {
    localStorage.removeItem('mernToken');
    this.setState({ token: '', user: null, lockedResult: '' });
  };

  handleClick = (e) => {
    e.preventDefault();
    // axios.defaults.headers.common['Authorization'] = `Bearer ${
    //   this.state.token
    // }`;
    let config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    };

    axios.get('/locked/test', config).then((res) => {
      this.setState({ lockedResult: res.data });
    });
  };

  componentDidMount() {
    this.checkForLocalToken();
  }

  render() {
    let user = this.state.user;
    let contents = (
      <>
        <LandingPage liftToken={this.liftTokenToState} />
        {/* <Profile user={user} logout={this.logout} /> */}
        {/* <UpdateProfile /> */}
        {/* <Events /> */}
        {/* <EventShow /> */}
        {/* <Representative /> */}
        {/* <Elections /> */}
      </>
    );

    if (user) {
      contents = (
        <>{/* <Profile user={user} logout={this.logout} /> */}</>
      );
    }

    return (
      <div className='App'>
        <Header />
        <main className='Content'>{contents}</main>
        <MenuBar />
      </div>
    );
  }
}

export default App;

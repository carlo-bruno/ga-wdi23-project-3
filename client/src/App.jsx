import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
// import Signup from './Components/Signup';
// import Login from './Components/Login';
import UserProfile from './Components/UserProfile';
import LandingPage from './Pages/LandingPage';
import UpdateProfile from './Pages/UpdateProfile';
import Representative from './Pages/Representative';
import MenuBar from './Components/MenuBar';
import Events from './Pages/Events';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: true,
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
        <UpdateProfile />
        <Representative />
        <Events />
        {/* <MenuBar /> */}
      </>
    );

    if (user) {
      contents = (
        <>
          <UserProfile user={user} logout={this.logout} />
        </>
      );
    }

    return <div className='App'>{contents}</div>;
  }
}

export default App;
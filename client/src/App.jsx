import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
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
import MapBox from './Components/MapBox';
import Signup from './Pages/Signup';

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
    axios.defaults.headers.common['Authorization'] = `Bearer ${
      this.state.token
    }`;
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
    console.log(
      'MAAAAPPPPPPP KEEEEYYY ++++++++>>>>>>',
      process.env.REACT_APP_MAPBOX_API_KEY
    );
  }

  render() {
    let user = this.state.user;
    let contents = (
      <>
        <Route
          exact
          path='/'
          render={() => (
            <LandingPage liftToken={this.liftTokenToState} />
          )}
        />
        {/* <LandingPage liftToken={this.liftTokenToState} /> */}

        <Route
          path='/profile'
          render={() => (
            <Profile user={user} logout={this.logout} />
          )}
        />
        {/* <Profile user={user} logout={this.logout} /> */}

        <Route
          path='/profile/update'
          render={() => <UpdateProfile user={user ? user : ''} />}
        />
        {/* <UpdateProfile  user={user? user : '' }/> */}

        <Route path='/events' render={() => <Events />} />
        {/* <Events /> */}

        {/* <Route path='/events/:id' render={() => <EventShow />} /> */}
        <Route path='/events/show' render={() => <EventShow />} />
        {/* <EventShow /> */}

        <Route
          path='/office/show'
          render={() => <Representative />}
        />
        {/* <Representative /> */}

        <Route path='/elections' component={Elections} />
        {/* <Elections /> */}
      
        <Route 
          path='/signup'
          render={() => <Signup />} />
      
      </>
      
    );

    if (user) {
      contents = (
        <>
          <UpdateProfile user={user ? user : ''} />
        </>
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

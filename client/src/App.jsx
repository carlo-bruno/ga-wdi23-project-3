import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import './App.css';

import MenuBar from './Components/MenuBar';
import Header from './Components/Header';

import LandingPage from './Pages/LandingPage';
import Profile from './Pages/Profile';
import Signup from './Pages/Signup';
import UpdateProfile from './Pages/UpdateProfile';
import Events from './Pages/Events';
import EventShow from './Pages/EventShow';
// InOffice
import Representative from './Pages/Representative';
import Elections from './Pages/Elections';
import InOffice from './Pages/InOffice';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      events: [],
      saved: []
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
    // get events
    axios.get('/events').then((response) => {
      this.setState({ events: response.data.events });
    });
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

        <Route
          exact
          path='/signup'
          render={(props) => (
            <Signup liftToken={this.liftTokenToState} />
          )}
        />

        <Route
          path='/profile/update'
          render={() => <UpdateProfile user={user ? user : ''} />}
        />

        <Route
          exact
          path='/events'
          render={(props) => (
            <Events
              events={this.state.events}
              saved={this.state.saved}
              {...props}
            />
          )}
        />

        <Route
          path='/events/:id'
          render={(props) => (
            <EventShow events={this.state.events} {...props} />
          )}
        />
        <Route exact path='/office' render={() => <InOffice />} />

        <Route
          path='/office/show'
          render={() => <Representative />}
        />

        <Route path='/elections' component={Elections} />

        <Route path='/signup' render={() => <Signup />} />
      </>
    );

    // if (user) {
    //   contents = (
    //     <>
    //       <p>you are logged in</p>
          {/* <Route
            exact
            path='/profile'
            render={(props) => (
              <Profile
                user={user}
                logout={this.logout}
                {...props}
              />
            )}
          /> */}
        {/* </>
      );
    } */}

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

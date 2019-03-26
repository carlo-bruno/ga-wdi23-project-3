import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Calendar } from '../images/calendar-regular.svg';
import { ReactComponent as Office } from '../images/landmark-solid.svg';
import { ReactComponent as Vote } from '../images/vote-yea-solid.svg';
import { ReactComponent as User } from '../images/user-alt-solid.svg';

class MenuBar extends Component {
  render() {
    let logged;

    if (this.props.user) {
      logged = (
        <Link to='/profile'>
          <User />
        </Link>
      );
    } else {
      logged = (
        <Link to='/'>
          <User />
        </Link>
      );
    }

    return (
      <div className='MenuBar'>
        <Link to='/events'>
          <Calendar />
        </Link>
        <Link to='/office'>
          <Office />
        </Link>
        <Link to='/elections'>
          <Vote />
        </Link>
        {logged}
      </div>
    );
  }
}

export default MenuBar;

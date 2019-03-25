import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Calendar } from '../images/calendar-regular.svg';
import { ReactComponent as Office } from '../images/landmark-solid.svg';
import { ReactComponent as Vote } from '../images/vote-yea-solid.svg';

class MenuBar extends Component {
  render() {
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
      </div>
    );
  }
}

export default MenuBar;

import React, { Component } from 'react';
import { ReactComponent as Calendar } from '../images/calendar-regular.svg';
import { ReactComponent as Office } from '../images/landmark-solid.svg';
import { ReactComponent as Vote } from '../images/vote-yea-solid.svg';

class MenuBar extends Component {
  render() {
    return (
      <div className='MenuBar'>
        <a href='/'>
          <Calendar />
        </a>
        <a href='/'>
          <Office />
        </a>
        <a href='/'>
          <Vote />
        </a>
      </div>
    );
  }
}

export default MenuBar;

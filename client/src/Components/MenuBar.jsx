import React, { Component } from 'react';

class MenuBar extends Component {
  render() {
    return (
      <div className='MenuBar'>
        <a href='/'>Events</a>
        <a href='/'>People</a>
        <a href='/'>Elections</a>
      </div>
    );
  }
}

export default MenuBar;

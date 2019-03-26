import React from 'react';
import InOffice from './InOffice';


const Representative = (props) => {
  return (
    <div className='Representative'>
      <header>
        <a href='/'>Home</a>
        <a href='/'>Log Out</a>
      </header>
      <section className='rep-profile-img'>
        <img src='http://placekitten.com/g/250/250' alt='' />
      </section>
      <section className='rep-profile'>
        <h2>Name</h2>
        <h4>Title</h4>
        <h4>Location</h4>
        <div className='social'>
          <a href='/'>twitter</a> | <a href='/'>facebook</a> |{' '}
          <a href='/'>instagram</a>
        </div>
      </section>
      <section className='rep-links'>
        <h3>
          <a href='/'>Website</a>
        </h3>
        <h3>
          <a href='/'>Info</a>
        </h3>
        <h3>
          <a href='/'>Policy</a>
        </h3>
      </section>
    </div>
  );
};

export default Representative;

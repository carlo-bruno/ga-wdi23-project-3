import React from 'react';

const Profile = (props) => {
  return (
    <div className='Profile'>
      <header>
        <a href='/'>Home</a>
        <a href='/'>Log Out</a>
      </header>
      <section className='welcome'>
        <h2>Welcome, Carlito!</h2>
        <div className='profile-img'>
          <img src='http://placekitten.com/g/150/150' alt='' />
        </div>
      </section>
    </div>
  );
};

export default Profile;

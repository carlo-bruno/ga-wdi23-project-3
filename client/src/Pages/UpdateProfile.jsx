import React from 'react';

const UpdateProfile = (props) => {
  return (
    <div className='UpdateProfile'>
      <header>
        <a href='/'>Home</a>
        <a href='/'>Log Out</a>
      </header>
      <section className='welcome'>
        <h2>Welcome, Carlito!</h2>
        <div className='profile-img'>
          <img src='http://placekitten.com/g/150/150' alt='' />
          <a href='/'>Upload profile image</a>
        </div>
      </section>
      <section className='profile-form'>
        <form>
          <input type='text' name='city' placeholder='City' />
          <input type='text' name='state' placeholder='State' />
          <input type='text' name='zip' placeholder='Zip Code' />
          <button type='submit'>Submit</button>
        </form>
      </section>
    </div>
  );
};

export default UpdateProfile;
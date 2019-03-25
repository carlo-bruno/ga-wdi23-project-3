import React from 'react';
import { ReactComponent as Back } from '../images/chevron-left-solid.svg';
import { ReactComponent as Cog } from '../images/cog-solid.svg';

const Profile = (props) => {
  return (
    <div className='Profile'>
      <section>
        <header>
          <a href='/'>
            <Back />
          </a>
          <a href='/'>
            <Cog />
          </a>
        </header>

        <div className='profile-img'>
          <img src='http://placekitten.com/g/150/150' alt='' />
        </div>
        <h2>First Last</h2>
        <p>Seattle, WA</p>
        <p>98111</p>
      </section>

      <button>Your Saved Events &rarr;</button>
    </div>
  );
};

export default Profile;

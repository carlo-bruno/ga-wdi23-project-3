import React from 'react';
import { ReactComponent as Back } from '../images/chevron-left-solid.svg';
import { ReactComponent as Cog } from '../images/cog-solid.svg';

const Profile = (props) => {
  return (
    <div className='Profile'>
      <section>
        <header>
          <i onClick={() => props.history.goBack()}>
            <Back />
          </i>
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

      <button className='saved-btn'>
        Your Saved Events &rarr;
      </button>
      <button
        className='logout-btn'
        onClick={() => {
          props.logout();
          props.history.push('/');
        }}>
        Log Out &rarr;
      </button>
    </div>
  );
};

export default Profile;

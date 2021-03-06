import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Cog } from '../images/cog-solid.svg';
import LoadingWhite from '../Components/LoadingWhite';

const Profile = (props) => {
  let profile = (
    <>
      <LoadingWhite />
      <p style={{ fontSize: '1.3rem' }}>
        You have to be logged in.
      </p>
    </>
  );

  let buttons = (
    <>
      <Link to='/'>
        <button className='btn'>Log In &rarr;</button>
      </Link>
      <Link to='/signup'>
        <button className='btn'>Sign Up &rarr;</button>
      </Link>
    </>
  );

  if (props.user) {
    profile = (
      <>
        <div className='profile-img'>
          {(props.user.image && (
            <img src={props.user.image} alt='user' />
          )) || (
            <img
              src='http://placekitten.com/g/200/200'
              alt='placeholder'
            />
          )}
        </div>
        <h2>{props.user.name}</h2>
        <h3>
          {props.user.city}, {props.user.state}
        </h3>
        <p>{props.user.zip}</p>
      </>
    );

    buttons = (
      <>
        <Link to='/events'>
          <button className='saved-btn'>
            Your Saved Events &rarr;
          </button>
        </Link>
        <button
          className='logout-btn'
          onClick={() => {
            props.logout();
            props.history.push('/');
          }}>
          Log Out &rarr;
        </button>
      </>
    );
  }

  return (
    <div className='Profile'>
      <section>
        <header>
          {props.user && (
            <Link to='/profile/update'>
              <Cog />
            </Link>
          )}
        </header>
        {profile}
      </section>
      {buttons}
    </div>
  );
};

export default Profile;

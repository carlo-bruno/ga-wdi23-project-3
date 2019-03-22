import React from 'react';
import Login from '../Components/Login';
import Signup from '../Components/Signup';

const LandingPage = (props) => {
  return (
    <div className='LandingPage'>
      <header>
        <div className='logo-box'>
          <img src='' alt='logo' />
        </div>
        <h1>Project 3</h1>
      </header>
      <section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Minus commodi magni iure voluptate quidem maxime eveniet
          quibusdam eos quae dicta non nemo fuga deserunt soluta,
          optio temporibus natus itaque laborum?
        </p>
      </section>
      <Login liftToken={props.liftToken} />
      <Signup liftToken={props.liftToken} />
    </div>
  );
};

export default LandingPage;

import React from 'react';
import Login from '../Components/Login';

const LandingPage = (props) => {
  return (
    <div className='LandingPage'>
      <section>
        <h2>Be involved. Be empowered.</h2>
        <h1>
          Be <span className='brand-font'>Citizenly</span>.
        </h1>
        <h3>
          Get in the know. You have the power to change the world. 
        </h3>
        <br />
        <p> New User? No Problem.
          <a href='/signup'> Sign Up!</a>
          </p>
      </section>
      <Login liftToken={props.liftToken} />
      <hr />
    </div>
  );
};

export default LandingPage;

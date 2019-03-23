import React from 'react';
import Login from '../Components/Login';
import Signup from '../Components/Signup';

const LandingPage = (props) => {
  return (
    <div className='LandingPage'>
      <section>
        <h2>Be involved. Be empowered.</h2>
        <h2>
          Be <span className='brand-font'>Citizenly</span>.
        </h2>
        <p>
          You have the power to change the world. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Laborum adipisci,
          minima eligendi placeat veniam nulla nesciunt.
        </p>
      </section>
      <Login liftToken={props.liftToken} />
      <hr />
      <Signup liftToken={props.liftToken} />
    </div>
  );
};

export default LandingPage;

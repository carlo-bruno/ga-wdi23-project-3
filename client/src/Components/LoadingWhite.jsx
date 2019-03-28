import React from 'react';
import { ReactComponent as LogoWhite } from '../images/logo-white.svg';

const LoadingWhite = (props) => {
  return (
    <div className='LoadingWhite'>
      <div className='inner'>
        <LogoWhite />
      </div>
    </div>
  );
};

export default LoadingWhite;

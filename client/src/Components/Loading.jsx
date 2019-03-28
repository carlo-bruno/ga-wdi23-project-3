import React from 'react';
import { ReactComponent as Logo } from '../images/logo.svg';

const Loading = (props) => {
  return (
    <div className='Loading'>
      <div className='inner'>
        <Logo />
      </div>
    </div>
  );
};

export default Loading;

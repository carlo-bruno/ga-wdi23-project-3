import React from 'react';
import { city, county } from '../data/office';

const OfficeShow = (props) => {
  
  let {
    name,
    title,
    twitter,
    fb,
    img,
    url
  } = props.showRep;

  showRep = (

    <div className='Representative'>
      <header>
        <a href='/'>Home</a>
        <a href='/'>Log Out</a>
      </header>
      <section className='rep-profile-img'>
        <img src={img} alt='img' />
      </section>
      <section className='rep-profile'>
        <h2>{name}</h2>
        <h4>{title}</h4>
        <h4>Seattle, WA</h4>
        <div className='social'>
          <a href={twitter}>twitter</a> | <a href={fb}>facebook</a> |
          
        </div>
      </section>
      <section className='rep-links'>
        <h3>
          <a href='/'>Website</a>
        </h3>
      </section>
    </div>
  );
};

export default OfficeShow;

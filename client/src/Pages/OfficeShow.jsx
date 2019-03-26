import React from 'react';

const OfficeShow = (props) => {
  let showRep =
    props.office.city.find((rep) => {
      return rep.name === props.match.params.name;
    }) ||
    props.office.county.find((rep) => {
      return rep.name === props.match.params.name;
    });

  let { name, email, phone, flickr, title, twitter, fb, img } = showRep;

  return (
    <div className='OfficeShow'>
      <section className='rep-profile-img'>
        <img src={img} alt='img' />
      </section>
      <section className='rep-profile'>
        <h2>{name}</h2>
        <h4>{title}</h4>
        <h4>Seattle, WA</h4>
        <div className='social'>
          <a href={twitter}>twitter</a> | <a href={fb}>facebook</a>{' '}
          |
        </div>
        <section>
          <p>{email}</p>
          <p><a href='tel:{phone}'>{phone}</a></p>
        
        </section>
      </section>
    </div>
  );
};

export default OfficeShow;

import React from 'react';
import { ReactComponent as Back } from '../images/chevron-left-solid.svg';
import { ReactComponent as Email } from '../images/envelope-solid.svg';
import { ReactComponent as Phone } from '../images/phone-square-solid.svg';

import Fb from '../images/facebook-square-brands.svg';
import Twitter from '../images/twitter-square-brands.svg';
import Ig from '../images/instagram-brands.svg';
import Flickr from '../images/flickr-brands.svg';

const OfficeShow = (props) => {
  let showRep =
    props.office.city.find((rep) => {
      return rep.name === props.match.params.name;
    }) ||
    props.office.county.find((rep) => {
      return rep.name === props.match.params.name;
    });

  let { img, name, title, phone, email } = showRep;

  let links = ['fb', 'twitter', 'ig', 'flickr'];
  let logos = { fb: Fb, twitter: Twitter, ig: Ig, flickr: Flickr };

  let social = links.map(
    (link, i) =>
      showRep.hasOwnProperty(link) && (
        <a key={i} href={showRep[link]}>
          <img src={logos[link]} alt={`${link}-logo`} />
        </a>
      )
  );

  return (
    <div className='OfficeShow'>
      <header>
        <i onClick={() => props.history.goBack()}>
          <Back />
        </i>
      </header>

      <section className='rep-profile-img'>
        <img src={img} alt='img' />
      </section>
      <section className='rep-profile'>
        <h2>{name}</h2>
        <h3>{title}</h3>
        <h3>Seattle, WA</h3>
        <div className='social'>{social}</div>
        <section>
          <p className='rep-contact'>
            <Email />
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p className='rep-contact'>
            <Phone />
            <a href={`tel:${phone}`}>{phone}</a>
          </p>
        </section>
      </section>
    </div>
  );
};

export default OfficeShow;

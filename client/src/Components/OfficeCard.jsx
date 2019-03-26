import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const OfficeCard = (props) => {
  return (
    <div className='OfficeCard'>
      <img src={props.img} />
      <p>{props.name}</p>
      <p>{props.title}</p>
    </div>
  );
};

export default OfficeCard;

import React from 'react';
import { Link } from 'react-router-dom';

const OfficeCard = (props) => {
  return (
    <div className='OfficeCard'>
      <img src={props.img} alt={props.name} />
      <p>{props.name}</p>
      <p>{props.title}</p>
    </div>
  );
};

export default OfficeCard;

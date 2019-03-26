import React from 'react';
import { Link } from 'react-router-dom';

const OfficeCard = (props) => {
  return (
    <div className='OfficeCard'>
      <div className='rep-info'>
        <Link to={`/office/${props.name}`}>
          <h3>{props.name}</h3>
        </Link>
        <p>{props.title}</p>
      </div>
      <div className='image-box'>
        <img src={props.img} alt={props.name} />
      </div>
    </div>
  );
};

export default OfficeCard;

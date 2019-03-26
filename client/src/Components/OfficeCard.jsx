import React from 'react';
import { Link } from 'react-router-dom';

const OfficeCard = (props) => {


    
    return (
        <>
        <img src={props.img} width='200px' height='200px' />
        <p>{props.name}</p>
        <p>{props.title}</p>
        </>
    )
 
}


export default OfficeCard;

  return (
    <div className='OfficeCard'>
      <img src={props.img} alt={props.name} />
      <p>{props.name}</p>
      <p>{props.title}</p>
    </div>
  );


export default OfficeCard;


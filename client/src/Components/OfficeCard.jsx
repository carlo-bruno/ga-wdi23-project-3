import React from 'react';
import moment from 'moment';
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
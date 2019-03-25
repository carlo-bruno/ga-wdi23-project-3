import React from 'react';
import moment from 'moment';

const EventCard = (props) => {
  let { event_name, venue, start_time } = props.event;
  let month = moment(start_time)
    .format('MMM')
    .toUpperCase();
  let date = moment(start_time).format('DD');
  let time = moment(start_time).format('h:mm A');

  return (
    <div className='EventCard'>
      <div className='date-box'>
        <p>{month}</p>
        <p>{date}</p>
      </div>
      <div className='info-box'>
        <h4>{event_name}</h4>
        <p>
          <span>{time}</span> <span>{venue}</span>
        </p>
      </div>
      <div className='save-box'>
        <b>+</b>
      </div>
    </div>
  );
};

export default EventCard;

import React from 'react';

const EventCard = (props) => {
  return (
    <div className='EventCard'>
      <div className='date-box'>
        <p>APR</p>
        <p>20</p>
      </div>
      <div className='info-box'>
        <h4>Pioneer Square Preservation Board meeting</h4>
        <p>
          <span>3:00 PM</span> <span>City Hall</span>
        </p>
      </div>
      <div className='save-box'>
        <b>+</b>
      </div>
    </div>
  );
};

export default EventCard;

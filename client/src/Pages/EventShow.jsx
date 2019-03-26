import React from 'react';
import moment from 'moment';
import { ReactComponent as Back } from '../images/chevron-left-solid.svg';
import { ReactComponent as Clock } from '../images/clock-regular.svg';
import { ReactComponent as Marker } from '../images/map-marker-alt-solid.svg';
import { ReactComponent as Contact } from '../images/address-book-regular.svg';
import { ReactComponent as BookmarkR } from '../images/bookmark-regular.svg';
import { ReactComponent as BookmarkS } from '../images/bookmark-solid.svg';

import MapBox from '../Components/MapBox';

const EventShow = (props) => {
  let content = <p>No Data Found</p>;

  if (props.events.length > 0) {
    let showEvent = props.events.find((event) => {
      return event.id === parseInt(props.match.params.id);
    });

    let {
      event_name,
      event_url,
      venue,
      street_address,
      start_time,
      description,
      lat,
      lon
    } = showEvent;

    let date = moment(start_time).format('dddd, MMMM D, YYYY');
    let fromNow = moment(start_time).fromNow();
    let time = moment(start_time).format('h:mm A');

    content = (
      <section>
        <div className='title-box'>
          <h2>{event_name}</h2>
        </div>

        <div className='date-box'>
          <Clock />
          <div>
            <p>{date}</p>
            <p>{fromNow}</p>
            <p>Start Time: {time}</p>
          </div>
        </div>

        <div className='location-box'>
          <Marker />
          <div>
            <p>{venue}</p>
            <p>{street_address}</p>
          </div>
        </div>

        <div className='contact-box'>
          <Contact />
          <div>
            <a href={event_url}>More Information</a>
          </div>
        </div>

        <div className='description-box'>
          <p>{description}</p>
        </div>
        <MapBox lat={lat} long={lon} />
      </section>
    );
  }

  return (
    <div className='EventShow'>
      <header>
        <i onClick={() => props.history.goBack()}>
          <Back />
        </i>
        <a href='/'>
          <BookmarkR />
        </a>
      </header>
      {content}
      {/* Mapbox goes here */}

      {/* <MapBox /> */}
    </div>
  );
};

export default EventShow;

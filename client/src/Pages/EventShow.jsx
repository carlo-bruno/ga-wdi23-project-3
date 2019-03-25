import React from 'react';
import { ReactComponent as Clock } from '../images/clock-regular.svg';
import { ReactComponent as Marker } from '../images/map-marker-alt-solid.svg';
import { ReactComponent as Contact } from '../images/address-book-regular.svg';
// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const EventShow = (props) => {
  let { event_name, venue, street_address } = props.event;
  return (
    <div className='EventShow'>
      <section>
        <div className='title-box'>
          <h2>{event_name}</h2>
        </div>

        <div className='date-box'>
          <Clock />
          <div>
            <p>Saturday, April 20, 2019</p>
            <p>2 days from now</p>
            <p>Start Time: 3:00 PM</p>
          </div>
        </div>

        <div className='location-box'>
          <Marker />
          <div>
            <p>{venue}</p>
            <p>600 4th Avenue, Seattle WA</p>
          </div>
        </div>

        <div className='contact-box'>
          <Contact />
          <div>
            <p>links: www.example.com</p>
            <p>phone: 123-321-1212</p>
          </div>
        </div>

        <div className='description-box'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Totam dolor sapiente voluptatibus, ex voluptate
            cupiditate sit commodi ab corporis quisquam est
            architecto quo porro error consequuntur sequi ipsam
            voluptatem nam.
          </p>
        </div>
      </section>
    </div>
  );
};

export default EventShow;

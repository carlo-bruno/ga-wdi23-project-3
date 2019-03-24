import React, { Component } from 'react';


class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'all',
      saved: []
    };
  }

 

  render() {
    return (
      <div className='Events'>
        <h2>Events</h2>
        <div className='events-filters'>
          <div>ALL</div>
          <div>SAVED</div>
        </div>

        <div className='events-collection'>
          {/* Cards of Events */}
          <div className='event-card'>
            <h3>Event Name</h3>
            <p>Event Date</p>
            <p>Event Location</p>
            {this.map}
          </div>
        </div>
      </div>
    );
  }
}

export default Events;

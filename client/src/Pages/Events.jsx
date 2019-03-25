import React, { Component } from 'react';
import EventCard from '../Components/EventCard';


class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'all',
      events: [],
      saved: []
    };
  }




  changeFilter = (filter) => {
    this.setState({ filter });
  };


  render() {
    return (
      <div className='Events'>
        <div className='events-filters'>
          <div
            className={`filter ${
              this.state.filter === 'all' ? 'active' : ''
            }`}
            onClick={() => this.changeFilter('all')}>
            ALL <span className='events-count'>20</span>{' '}
          </div>
          <div
            className={`filter ${
              this.state.filter === 'saved' ? 'active' : ''
            }`}
            onClick={() => this.changeFilter('saved')}>
            SAVED <span className='events-count'>5</span>
          </div>
        </div>

        <div className='events-collection'>
          {/* Cards of Events */}

          <div className='event-card'>
            <h3>Event Name</h3>
            <p>Event Date</p>
            <p>Event Location</p>
            {this.map}
          </div>

          <EventCard />
          <EventCard />
          <EventCard />
]
        </div>
      </div>
    );
  }
}

export default Events;

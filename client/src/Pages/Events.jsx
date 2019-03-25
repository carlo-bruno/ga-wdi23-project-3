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

  componentDidMount() {
    this.setState({
      events: this.props.events
    });
  }

  render() {
    let cards = this.props.events.map((event, i) => {
      return <EventCard key={i} event={event} />;
    });

    return (
      <div className='Events'>
        <div className='events-filters'>
          <div
            className={`filter ${
              this.state.filter === 'all' ? 'active' : ''
            }`}
            onClick={() => this.changeFilter('all')}>
            ALL{' '}
            <span className='events-count'>
              {this.props.events.length}
            </span>{' '}
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
          {cards}
        </div>
      </div>
    );
  }
}

export default Events;

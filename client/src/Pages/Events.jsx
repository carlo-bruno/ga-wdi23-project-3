import React, { Component } from 'react';
import EventCard from '../Components/EventCard';

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'all',
      zip: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      events: this.props.events
    });
  }

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  handleChange(e) {
    console.log('HANDLE CHANGEEEE');
    this.setState({
      zip: e.target.value
    });
  }

  render() {
    let display =
      this.state.filter === 'all'
        ? this.props.events
        : this.props.saved;
    let cards = display.map((event, i) => {
      return <EventCard key={i} event={event} />;
    });

    return (
      <div className='Events'>
        <header>
          <input
            onChange={this.handleChange}
            type='text'
            name='queryZip'
            id='queryZip'
            placeholder='zip code'
            value={this.state.zip}
          />
          <button
            onClick={() => this.props.getEvents(this.state.zip)}>
            Search
          </button>
        </header>
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
            SAVED{' '}
            <span className='events-count'>
              {this.props.saved.length}
            </span>
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

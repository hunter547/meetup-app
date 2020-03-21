import React, { Component } from 'react';

class Event extends Component {
  state = {
    showDetails: false
  }

  flipShowDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails
    })
  }

  render() {
    const { event } = this.props;
    return (
      <div className="Event">
        <p className="Event__time">
          {event.local_time + '-' + event.local_date}
        </p>
        <p className="Event__name">
          {event.name}
        </p>
        <p className="Event__group-name">
          {event.group.name}
        </p>
        <p className="Event__rsvps" >
          {event.yes_rsvp_count + ' people are going'}
        </p>
        {this.state.showDetails ?
          <span className="Event__details">
            <p className="Event__address">
              {event.venue.name + ', ' + event.venue.address_1 + ', ' +
                event.venue.city + ', ' + event.venue.state + ' ' +
                event.venue.zip
              }
            </p>
            <p className="Event__description">
              {event.description}
            </p>
            <p className="Event__visibility">
              {event.visibility}
            </p>
            <a className="Event__link" 
              href={event.link}>
              Event link
            </a>
          </span>
        : null}
        <button className="Event__details-button" onClick={this.flipShowDetails}>Details</button>
      </div>
    );

  }
}

export default Event;
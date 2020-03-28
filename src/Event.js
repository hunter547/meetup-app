import React, { Component } from 'react';
import upArrow from './up-arrow.svg';
import downArrow from './down-arrow.svg';

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
            {event.venue ? <p className="Event__address">
              {event.venue.name + ', ' + event.venue.address_1 + ', ' +
                event.venue.city + ', ' + event.venue.state + ' ' +
                event.venue.zip
              }
            </p>
              : null}
            <div className="Event__description" dangerouslySetInnerHTML={{ __html: event.description }}>
            </div>
            <p className="Event__visibility">
              {event.visibility}
            </p>
            <a className="Event__link"
              href={event.link}>
              Event link
            </a>
          </span>
          : null}
        <div className="Event__button-div">
          {this.state.showDetails ?
            <button className="Event__details-button" onClick={this.flipShowDetails}><img className="Event__up-arrow" src={upArrow} alt="Less Details Button"/></button>
            :
            <button className="Event__details-button" onClick={this.flipShowDetails}><img className="Event__down-arrow" src={downArrow} alt="More Details Button"/></button>}
        </div>
      </div>
    );

  }
}

export default Event;
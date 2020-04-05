import React, { Component } from 'react';
import upArrow from './svgs/up-arrow.svg';
import downArrow from './svgs/down-arrow.svg';
import {
  PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

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
    const colors = ['#F64060','#eee']
    const pieData = [
      {name: "Going", value: event.yes_rsvp_count},
      {name: "Available", value: event.rsvp_limit - event.yes_rsvp_count}
    ];
    return (
      <div className="Event" onClick={this.flipShowDetails}>
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
        {event.rsvp_limit && event.yes_rsvp_count ?
          <ResponsiveContainer height={200}>
            <PieChart>
              <Pie data={pieData} fill="#8884d8" dataKey="value" nameKey="name" cx="50%" cy="50%" label>
                      {
                        pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index]}/>
                        ))
                      } 
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          :
          null
        }
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
            <button className="Event__details-button" onClick={this.flipShowDetails}><img className="Event__up-arrow" src={upArrow} alt="Less Details Button" /></button>
            :
            <button className="Event__details-button" onClick={this.flipShowDetails}><img className="Event__down-arrow" src={downArrow} alt="More Details Button" /></button>}
        </div>
      </div>
    );

  }
}

export default Event;
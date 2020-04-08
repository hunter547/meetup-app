import React, { Component } from 'react';
import upArrow from './svgs/up-arrow.svg';
import downArrow from './svgs/down-arrow.svg';
import {
  PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import moment from 'moment';

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
    const colors = ['#F64060', '#32CD32'];
    const eventDate = moment(event.local_date);
    const eventTime = moment(event.local_time, 'HH:mm')
    const pieData = [
      { name: " " + event.yes_rsvp_count + " Going", value: event.yes_rsvp_count },
      { name: " " + (event.rsvp_limit - event.yes_rsvp_count) + " Available", value: event.rsvp_limit - event.yes_rsvp_count }
    ];
    const formatDescription = '<b>Description: </b>' + event.description;

    return (
      <div className="Event__grid-item" onClick={this.flipShowDetails}>
        <p className="Event__time">
          {eventDate.format('dddd, MMMM Do') + ' @ ' + eventTime.format('hh:mm a')}
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
          <div className="Event__details">
            {event.rsvp_limit && event.yes_rsvp_count ?
              <div>
                <ResponsiveContainer height={200}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={50}>
                      {
                        pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))
                      }
                    </Pie>
                    <Legend iconType="circle" iconSize={10} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              :
              null
            }
            {event.venue ? <p className="Event__address"> <b>Address: </b><br />
              {event.venue.name + ', ' + event.venue.address_1 + ', ' +
                event.venue.city + ', ' + event.venue.state + ' ' +
                event.venue.zip
              }
            </p>
              : null}
            <div className="Event__description" dangerouslySetInnerHTML={{ __html: formatDescription }}>
            </div>
            {event.visibility === 'public' ?
            <p className="Event__visibility-green">
              <b className="Event__visibility">Visibility: </b>{event.visibility}
            </p>
            :
            <p className="Event__visibility-red">
              <b className="Event__visibility">Visibility: </b>public limited
            </p>
            }
            <a className="Event__link"
              href={event.link}>
              Event link
            </a>
          </div>
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
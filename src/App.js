import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import { WarningAlert } from './Alert';
import moment from 'moment';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';


class App extends Component {

  // "_isMounted" below is used to prevent this error: Warning: Can't perform a React state update on an unmounted component.
  // This is a no-op, but it indicates a memory leak in your application.
  // To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.  
  _isMounted = false;

  state = {
    events: [],
    renderedEvents: [],
    page: null,
    warningText: '',
    showEvents: false,
    filterEvents: false
  }

  componentDidMount() {
    this._isMounted = true;
    this.updateEvents();
  }

  updateEvents = (lat, lon, page) => {
    getEvents(lat, lon, page ? page : this.state.page).then(events => {
      if (this._isMounted) {
        this.setState({ events, renderedEvents: events, filterEvents: false })
        if (!navigator.onLine) {
          this.setState({
            warningText: 'You\'re currently offline. Cached data is being displayed.'
          })
        }
        else {
          this.setState({
            warningText: ''
          })
        }
      }
    });

    if (page) {
      this.setState({
        page
      })
    }
  }

  flipChart = () => {
    this.setState({
      showEvents: !this.state.showEvents
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  countEventsOnADate = (date) => {
    if (this._isMounted) {
      let count = 0;
      for (let i = 0; i < this.state.events.length; i += 1) {
        if (this.state.events[i].local_date === date) {
          count += 1;
        }
      }
      return count;
    }
  }

  getData = () => {
    if (this._isMounted) {
      const next7Days = []; // Create empty array for the next 7 days
      const currentDate = moment(); // Today
      // Loop 7 times for next 7 days
      for (let i = 0; i < 7; i += 1) {
        currentDate.add(1, 'days'); // Add 1 day to current date, currentDate changes
        const dateString = currentDate.format('YYYY-MM-DD'); // Format the date
        // Use the countEventsOnADate function to count #events on this date
        const count = this.countEventsOnADate(dateString);
        const aestheticDate = currentDate.format('MMMM Do');
        next7Days.push({ Date: aestheticDate, Events: count, local_date: dateString }); // Add this date and number to the list
      }
      return next7Days;
    }
  }

  getEvents = (event) => {
    const events = [];
    for (let i = 0; i < this.state.events.length; i += 1) {
      if (event.payload.local_date === this.state.events[i].local_date) {
        events.push(this.state.events[i]);
      }
    }
    if (!this.state.filterEvents && this.state.events !== events) {
      this.setState({
        renderedEvents: events,
        filterEvents: !this.state.filterEvents
      });
    }
    else if (this.state.events !== events) {
      this.setState({
        renderedEvents: events
      })
    }
  }

  resetEvents = () => {
    const events = localStorage.getItem('lastEvents');
    this.setState({
      renderedEvents: JSON.parse(events),
      filterEvents: !this.state.filterEvents
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="App__non-header">
          <CitySearch updateEvents={this.updateEvents} />
          <NumberOfEvents updateEvents={this.updateEvents} />
          <WarningAlert text={this.state.warningText} />
          {this.state.showEvents ?
            <button className="App__select-events-button" onClick={this.flipChart}>Select events this week &#8593;</button>
            :
            <button className="App__select-events-button" onClick={this.flipChart}>Select events this week &#8595;</button>
          }
          {this.state.showEvents ?
            <ResponsiveContainer className="App__barchart" height={400}>
              <BarChart
                margin={{
                  top: 20, right: 20, bottom: 20, left: 20,
                }}
                data={this.getData()}>
                <XAxis type="category" dataKey="Date" interval="preserveStartEnd" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Bar className="App__barchart-bar" dataKey="Events" fill="#F64060" onClick={this.getEvents}>
                  <LabelList dataKey="Events" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            :
            null}
          {this.state.filterEvents ?
            <div className="App__show-events-div">
              <button className="App__show-events-button" onClick={this.resetEvents}>&#8592; Back to all events</button>
            </div>          
            :
            null
          }
          <EventList events={this.state.renderedEvents} />
        </div>
      </div>
    );
  }
}

export default App;
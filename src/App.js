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
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';


class App extends Component {

  // "_isMounted" below is used to prevent this error: Warning: Can't perform a React state update on an unmounted component.
  // This is a no-op, but it indicates a memory leak in your application.
  // To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.  
  _isMounted = false;

  state = {
    events: [],
    page: null,
    warningText: '',
  }

  componentDidMount() {
    this._isMounted = true;
    this.updateEvents();
  }

  updateEvents = (lat, lon, page) => {
    getEvents(lat, lon, page ? page : this.state.page).then(events => {
      if (this._isMounted) {
        this.setState({ events })
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
        next7Days.push({ Date: aestheticDate, Events: count }); // Add this date and number to the list
      }
      return next7Days;
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="App__non-header">
          <CitySearch updateEvents={this.updateEvents} />
          <NumberOfEvents updateEvents={this.updateEvents} />
          <WarningAlert text={this.state.warningText} />
          <ResponsiveContainer height={400}>
            <BarChart
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
              data={this.getData()}>
              <XAxis type="category" dataKey="Date" interval="preserveStartEnd" />
              <YAxis allowDecimals={false}/>
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Bar dataKey="Events" fill="#F64060">
                <LabelList dataKey="Events" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <EventList events={this.state.events} />
        </div>
      </div>
    );
  }
}

export default App;
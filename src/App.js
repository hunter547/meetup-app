import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import { WarningAlert } from './Alert';

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

  render() {
    return (
      <div className="App">
        <CitySearch updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <WarningAlert text ={this.state.warningText} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
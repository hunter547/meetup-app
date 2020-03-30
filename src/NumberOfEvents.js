import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    eventNumber: 32,
    error: ''
  }
  changeNumberOfEvents = (event) => {
    const value = event.target.value;
    this.setState({
      eventNumber: value
    })
    if (value < 1 || !value) {
      this.setState({
        error: 'Please input a number greater than 0'
      })
    }
    else {
      this.setState({
        error: ''
      })
      this.props.updateEvents(null,null,value);
    }
  }
  render() {
    return(
      <div className="NumberOfEvents">
        <ErrorAlert text={this.state.error} />
        <span className="NumberOfEvents__input-span">Show
            <input className="NumberOfEvents__input-field"
              type="number"
              value={this.state.eventNumber}
              onChange={this.changeNumberOfEvents}
            />Events
        </span>
      </div>
    )
  }
}

export default NumberOfEvents;
import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventNumber: Number
  }
  changeNumberOfEvents = (event) => {
    this.setState({
      eventNumber: event.target.value
    })
  }
  render() {
    return(
      <div className="NumberOfEvents">
        <p className="NumberOfEvents__label">
          Show <span className="NumberOfEvents__input-span">
            <input className="NumberOfEvents__input-field"
              value={this.state.eventNumber}
              onChange={this.changeNumberOfEvents}
            />
          </span> Events
        </p>
      </div>
    )
  }
}

export default NumberOfEvents;
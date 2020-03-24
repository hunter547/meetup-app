import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventNumber: 32
  }
  changeNumberOfEvents = (event) => {
    this.setState({
      eventNumber: event.target.value
    })
  }
  render() {
    return(
      <div className="NumberOfEvents">
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
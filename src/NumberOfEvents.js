import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventNumber: 32
  }
  changeNumberOfEvents = (event) => {
    const value = event.target.value;
    this.setState({
      eventNumber: value
    })
    this.props.updateEvents(null,null,value);
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
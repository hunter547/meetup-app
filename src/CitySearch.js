import React, { Component } from 'react';
import { getSuggestions } from './api';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: []
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      query: value
    });
    getSuggestions(value)
    .then(suggestions => {
      this.setState({
        suggestions
      })
    });
  }

  handleItemClicked = (name_string, lat, lon) => {
    this.setState({
      query: name_string,
      suggestions: []
    });
    this.props.updateEvents(lat, lon);
  }

  render() {
    return (
      <div className="CitySearch">
        <input
          type="text"
          placeholder="City"
          className="CitySearch__city"
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
        <ul className="CitySearch__suggestions">
          {this.state.suggestions.map(item =>
            <li key={item.name_string}
                onClick={() => this.handleItemClicked(item.name_string, item.lat, item.lon)}
                  >{item.name_string}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default CitySearch;

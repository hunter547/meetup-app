import React, { Component } from 'react';

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
  }

  handleItemClicked = (name_string) => {
    this.setState({
      query: name_string
    });
  }

  render() {
    return (
      <div className="CitySearch">
        <input
          type="type"
          placeholder="City"
          className="CitySearch__city"
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
        <ul className="CitySearch__suggestions">
          {this.state.suggestions.map(item =>
            <li key={item.name_string}
                onClick={() => this.handleItemClicked(item.name_string)}
                  >{item.name_string}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default CitySearch;

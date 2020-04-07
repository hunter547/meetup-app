import React, { Component } from 'react';
import people from './svgs/2650148.svg';

class Header extends Component {
  
  render() {
    return(
      <div className="Header">
        <p className="Header__title">Linkup</p>
        <img className="Header__people-svg" src={people} alt="Group of friends" />
      </div>
    )
  }
}

export default Header;
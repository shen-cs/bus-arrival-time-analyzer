import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import logo from '../assets/logo.svg';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to bus analyzer</h2>
          <p style={{margin: 10}}>Author: Shen Chang-Shao</p>
        </div>
        <p className="App-intro">
          <Link to="/chart"><RaisedButton label="start"/></Link>
        </p>
      </div>
    );
  }
}

export default App;

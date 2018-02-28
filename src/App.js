import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from "./Toolbar";
import Messages from "./Messages";


class App extends Component {
  render() {
      const data = require("./data.json");
      return (
      <div className="App">
       <Toolbar />
          <Messages messages={data}/>
      </div>
    );
  }
}

export default App;

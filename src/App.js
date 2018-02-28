import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from "./Toolbar";
import Messages from "./Messages";


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectAll: false
        }
    }

    render() {
        const data = require("./data.json");
        return (
            <div className="App">
                <Toolbar handleSelectAll={this.handleSelectAll} selectAll={this.state.selectAll}/>
                <Messages messages={data} selectAll={this.state.selectAll}/>
            </div>
        );
    }

    handleSelectAll = () => {
        console.log('handle select all', this.state.selectAll)
        this.setState((prevState) => ({
            ...prevState,
            selectAll: !prevState.selectAll
        }))
    }
}

export default App;

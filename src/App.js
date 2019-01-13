import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry_value: "",
      text: "",
    };
  }

  render() {
    return (
      <div className="entrys">
        <Entry/><Entry/><Entry/>
      </div>
    );
  }
}

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry_value: "",
      bgColor: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ entry_value: event.target.value });
    if (event.target.value.toLowerCase() === "hello") {
      this.setState({ bgColor: "greenyellow" });
    } else {
      this.setState({ bgColor: "darkgrey" });
    }
  }

  render() {
    return (
          <input 
            className="reactEntry"
            type='text'
            value={this.state.entry_value}
            onChange={this.handleChange}
            style={{backgroundColor: this.state.bgColor}}/>
    );
  }
}

export default App;

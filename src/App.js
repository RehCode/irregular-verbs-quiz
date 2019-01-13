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
        <Entry word={"get"} clue={true}/><Entry word={"got"}/><Entry word={"gotten"}/> 
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
    if (event.target.value.toLowerCase() === this.props.word) {
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
            value={this.props.clue ? this.props.word: this.state.entry_value}
            onChange={this.handleChange}
            style={{backgroundColor: this.state.bgColor}}
            readOnly={this.props.clue ? true : false}
            />
            
    );
  }
}

export default App;

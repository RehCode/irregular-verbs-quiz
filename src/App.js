import React, { Component } from 'react';
import './App.css';
import {words_list} from './words.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry_value: "",
      text: "",
    };
    this.totalWords = words_list.length;
    this.getRandomIntInclusive = this.getRandomIntInclusive.bind(this);
    this.getWordIndex = this.getWordIndex.bind(this);
    this.getClueIndex = this.getClueIndex.bind(this);
    this.createEntryRows = this.createEntryRows.bind(this);
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getWordIndex() {
    var index = this.getRandomIntInclusive(0, this.totalWords)
    return index;
  }

  getClueIndex() {
    var index = this.getRandomIntInclusive(0, 2);
    return index;
  }

  createEntryRows(totalRows) {
    let rows = []
    for (let index = 0; index < totalRows; index++) {
      rows.push(<EntryRow
        wordIndex={this.getWordIndex()}
        clue={this.getClueIndex()} />)
    }
    return rows
  }

  render() {
    return (
      <div>
        {this.createEntryRows(25)}   
      </div>
    );
  }
}

class EntryRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordIndex: 0
    };
  }
  render() {
    return (
      <div className="entrys">
        <Entry word={words_list[this.props.wordIndex][0]}
               clue={this.props.clue === 0 ? true : false}/>
        <Entry word={words_list[this.props.wordIndex][1]} 
               clue={this.props.clue === 1 ? true : false}/>
        <Entry word={words_list[this.props.wordIndex][2]} 
               clue={this.props.clue === 2 ? true : false}/> 
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
    let className = "reactEntry";
    if (this.props.clue) {
      className += " clue";
    }
    return (
          <input 
            className={className}
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

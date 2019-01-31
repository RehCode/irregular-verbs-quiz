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
    this.totalTimeWords = words_list.length;
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
    var index = this.getRandomIntInclusive(0, this.totalTimeWords)
    return index;
  }

  getClueIndex() {
    var index = this.getRandomIntInclusive(0, 2);
    return index;
  }

  createEntryRows(totalTimeRows) {
    let rows = []
    for (let index = 0; index < totalTimeRows; index++) {
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
      disable: this.props.clue ? true : false,
      startTimer: false,
      time: 0,
      totalTime: 30,
      progressStyle: 'linear-gradient(90deg, white 1%, white 99%)',
    };
    this.handleChange = this.handleChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this)
  }

  startTimer() {
    if (this.props.word.length > 5) {
      let moreTime = (this.props.word.length - 5) * 3
      this.setState({ totalTime: this.state.totalTime + moreTime })
    }
    this.timerID = setInterval(() => this.tick(), 100);
  }

  stopTimer() {

    clearInterval(this.timerID);
    console.log("stop");

  }

  tick() {
    this.setState({ time: this.state.time + 1 });

    if (this.state.time >= this.state.totalTime ) {
      this.setState({ disable: true });
      this.stopTimer();
    }

    let style = 'linear-gradient(90deg, ' + this.state.bgColor + ' ' + this.state.time / this.state.totalTime * 100 + '%, white 1%)';
    this.setState({ progressStyle: style });
  }

  handleChange(event) {
    this.setState({ entry_value: event.target.value });
    if (!this.state.startTimer) {
      this.setState({ startTimer: true })
      this.startTimer();
    }
    if (event.target.value.toLowerCase() === this.props.word) {
      
      this.setState({ bgColor: "greenyellow" });

      let style = 'linear-gradient(90deg, greenyellow ' + this.state.time / this.state.totalTime * 100 + '%, white 1%)';
      this.setState({ progressStyle: style });

      // this.setState({ disable: true });
      this.stopTimer();
      
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
            style={this.props.clue ? {background: this.state.bgColor} : {background: this.state.progressStyle} }
            readOnly={this.props.clue ? true : false}
            disabled={this.state.disable ? true : false}
            />
    );
  }
}

export default App;

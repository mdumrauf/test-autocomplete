import React, { Component } from 'react';
import './AutocompleteApp.css';

export class AutocompleteApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    };
  }

  onChange = (event) => {
    const userInput = event.currentTarget.value;

    this.setState({
      userInput
    });
  };

  render() {
    const {userInput, onChange} = this;

    return (
      <form className="autocomplete-app">
        <input
          type="text"
          autoFocus
          onChange={onChange}
          value={userInput} />
        <ul className="autocomplete-suggestions">
          <li>Example suggestion.</li>
        </ul>
      </form>
    );
  }
}

export default AutocompleteApp;
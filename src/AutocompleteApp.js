import React, { Component } from 'react';
import './AutocompleteApp.css';

export class AutocompleteApp extends Component {
  render() {
    return (
      <form className="autocomplete-app">
        <input
          type="text"
          autoFocus />
        <ul className="autocomplete-suggestions">
          <li>Example suggestion.</li>
        </ul>
      </form>
    );
  }
}

export default AutocompleteApp;
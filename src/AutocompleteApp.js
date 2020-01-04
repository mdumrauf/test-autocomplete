import React, { Component } from 'react';
import {isEmpty, map} from 'lodash';
import './AutocompleteApp.css';

export class AutocompleteApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      userInput: ''
    };
  }

  onChange = async(event) => {
    const userInput = event.currentTarget.value;

    const response = await fetch(`/api/books`);
    const {result} = await response.json();

    this.setState({
      books: result,
      userInput
    });
  };

  render() {
    const {
      onChange,
      state: {
        books,
        userInput
      }
    } = this;

    let suggestionsList;

    if (!isEmpty(userInput) && !isEmpty(books)) {
      suggestionsList = (
        map(books, book => {
          return (
            <li key={book.id}>{book.title}</li>
          );
        })
      )
    }

    return (
      <form className="autocomplete-app">
        <input
          type="text"
          autoFocus
          onChange={onChange}
          value={userInput} />
        <ul className="autocomplete-suggestions">
          {suggestionsList}
        </ul>
      </form>
    );
  }
}

export default AutocompleteApp;
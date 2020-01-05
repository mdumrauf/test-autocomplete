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

    const response = await fetch(`/api/books?query=${userInput}`);
    const {result} = await response.json();

    this.setState({
      books: result,
      userInput
    });
  };

  onClick = e => {
    this.setState({
      books: [],
      userInput: e.currentTarget.innerText
    });
    this.props.history.push(`/books/${e.target.id}`);
  };

  render() {
    const {
      onChange,
      onClick,
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
            <li
              id={book.id}
              key={book.id}
              onClick={onClick}>
              {book.title}
            </li>
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
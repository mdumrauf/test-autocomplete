import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';
import {parse} from 'query-string'
import {isEmpty, map} from 'lodash';
import './AutocompleteApp.css';

const ENTER_KEY = 13;
const UP_KEY = 38;
const DOWN_KEY = 40;

export class AutocompleteApp extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      currentBookIndex: 0,
      userInput: ''
    };
  }

  onChange = async(event) => {
    const userInput = event.currentTarget.value;

    if (isEmpty(userInput)) {
      this.setState({
        books: [],
        userInput
      });
      this.props.history.replace({pathname: '/'});
      return;
    }
    this.props.history.replace({pathname: '/', search: `?q=${userInput}`});
  };

  async searchBooks() {
    const {q} = parse(this.props.location.search)
    const response = await fetch(`/api/books?query=${q}`);
    const { result } = await response.json();

    this.setState({
      books: result,
      userInput: q
    });
  }

  componentDidMount = async () => {
    await this.searchBooks();
  }

  componentDidUpdate = async (prevProps) => {
    if (this.props.location !== prevProps.location) {
      this.searchBooks();
    }
  }

  selectBook(bookId, bookTitle) {
    this.setState({
      books: [],
      userInput: bookTitle
    });
    this.props.history.push(`/books/${bookId}`);
  }

  onKeyDown = e => {
    const { currentBookIndex, books } = this.state;

    switch (e.keyCode) {
      case ENTER_KEY:
        {
          const selectedBook = books[currentBookIndex];
          this.setState({
            currentBookIndex: 0,
          });
          this.selectBook(selectedBook.id, selectedBook.title);
          break;
        }
      case UP_KEY:
        if (currentBookIndex === 0) {
          return;
        }
        this.setState({ currentBookIndex: currentBookIndex - 1 });
        break;
      case DOWN_KEY:
        if (currentBookIndex - 1 === books.length) {
          return;
        }

        this.setState({ currentBookIndex: currentBookIndex + 1 });
        break;
      default:
        return;
    }
  };

  onClick = e => {
    this.selectBook(e.target.id, e.currentTarget.innerText);
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        books,
        currentBookIndex,
        userInput
      }
    } = this;

    let suggestionsList;

    if (!isEmpty(userInput) && !isEmpty(books)) {
      suggestionsList = (
        map(books, (book, pos) => {
          let className;

          if (pos === currentBookIndex) {
            className = "selected";
          }
          return (
            <li
              id={book.id}
              className={className}
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
          onKeyDown={onKeyDown}
          value={userInput} />
        <ul className="autocomplete-suggestions">
          {suggestionsList}
        </ul>
      </form>
    );
  }
}

export default withRouter(AutocompleteApp);

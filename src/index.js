import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom'

import './reset.css';
import './index.css';

import AutocompleteApp from './AutocompleteApp';
import Book from './Book';


const router = (
    <Router>
      <div>
        <Route exact path="/" component={AutocompleteApp} />
        <Route path="/books/:id" component={Book} />
      </div>
    </Router>
  )

ReactDOM.render(router, document.getElementById('root'));

import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import AutocompleteApp from './AutocompleteApp';

const router = (
  <Router>
    <AutocompleteApp/>
  </Router>
)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(router, div);
  ReactDOM.unmountComponentAtNode(div);
});

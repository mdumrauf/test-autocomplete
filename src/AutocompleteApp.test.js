import React from 'react';
import ReactDOM from 'react-dom';
import AutocompleteApp from './AutocompleteApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AutocompleteApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

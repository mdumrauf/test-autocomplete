import React from 'react';

import './AutocompleteApp.css';

export default function AutocompleteApp() {
  return (
    <form className="autocomplete-app">
      <input type="text" autoFocus />
      <ul className="autocomplete-suggestions">
        <li>Example suggestion.</li>
      </ul>
    </form>
  );
}

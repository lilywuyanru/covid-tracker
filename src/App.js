import React from 'react';
import './App.css';
import { Navigation } from './components/Navigation/Navigation.js';
import { SearchSelection } from './components/SearchSelection/SearchSelection.js';

function App() {
  return (
    <div className="App">
        <Navigation />
        <br />
        <div class="content" align="center">
          <SearchSelection />
        </div>
        <br />
    </div>
  );
}

export default App;

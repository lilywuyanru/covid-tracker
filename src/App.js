import React from 'react';
import './App.css';
import { Navigation } from './components/Navigation/Navigation.js';
import { SearchSelection } from './components/SearchSelection/SearchSelection.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
          <Navigation />
          <br />
          <Switch>
            <Route exact path="/">
              <div class="content" align="center">
                <SearchSelection />
              </div>
            </Route>
            <Route exact path="/about">
              <div class="content" align="center">
                <h1>just tryna figure out routes</h1>
              </div>
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;

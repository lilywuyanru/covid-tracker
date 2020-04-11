import React from 'react';
import './App.css';
import { Navigation } from './components/Navigation/Navigation.js';
import { GraphComponent } from './components/GraphComponent/GraphComponent.js';
import { SearchSelection } from './components/SearchSelection/SearchSelection.js';

function App() {
  return (
    <div className="App">
        <Navigation />
        <br />
        <SearchSelection />
        <br />
        <GraphComponent />

        {/* <div className="container">
          {data &&
            data.results &&
            data.results.map((result, index) => (
               <div>
                  <p>date: {result.date}</p>
                  <p>country: {result.country.name}</p>
                  <p>confirmed: {result.confirmed}</p>
                  <p>deaths: {result.deaths}</p>
                  <p>recovered: {result.recovered}</p>
                  <p>growthRate: {result.growthRate}</p>
                  <br/>
              </div>
            ))}
        </div> */}
    </div>
  );
}

export default App;

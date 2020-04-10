import React from 'react';
import './App.css';
import { Navigation } from './components/Navigation/Navigation.js';
import { GraphComponent } from './components/GraphComponent/GraphComponent.js';

import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function App() {
  return (
    <div className="App">
        <Navigation />
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

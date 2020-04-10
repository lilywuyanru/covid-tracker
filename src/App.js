import React, { Component } from 'react';
import './App.css';
import { Navigation } from './components/navigation/navigation.js';
// import { Data } from './components/data/data.js';

import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function App() {
  // get query data
  const { data, loading, error } = useQuery(GET_RESULT);

  console.log(data);
  var confirmed_array = [];
  var death_case_array = [];

  var list = data && data.results && data.results.map((result) => {
    confirmed_array.push({ y: result.confirmed, label: result.date })
    death_case_array.push({ y: result.deaths, label: result.date })
  });
  
  console.log(death_case_array)

  // create/initialize graph
  const options = {
    animationEnabled: true,	
    title:{
      text: "Covid 19 Data"
    },
    height:420,
    width:1200,
    axisY : {
      title: "NumberOfCases",
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    data: [{
      type: "spline",
      name: "confirmed",
      showInLegend: true,
      dataPoints: confirmed_array
    },
    {
      type: "spline",
      name: "death",
      showInLegend: true,
      dataPoints: death_case_array
    }]
  }

  return (
    <div className="App">
        <Navigation />

        <div>
        <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
        />
      </div>
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


const GET_RESULT = gql`
{
  results (countries: "Canada", date: { lt: "4/9/2020" }) {
    country {
      name
    }
    date
    confirmed
    deaths
    recovered
    growthRate
  }
}
`
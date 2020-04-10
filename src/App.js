import React from 'react';
import './App.css';
import { Navigation } from './components/navigation/navigation.js';
// import { Data } from './components/data/data.js';

import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";


function App() {
  const { data, loading, error } = useQuery(GET_RESULT);

  return (
    
    <div className="App">
        <Navigation />
        <div className="container">
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
        </div>
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
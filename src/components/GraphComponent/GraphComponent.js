 // eslint-disable-next-line
import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import CanvasJSReact from '../../canvasjs.react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://covid19-graphql.now.sh/'
})

const client = new ApolloClient({
  cache,
  link
})

var today = new Date();
var date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
// $countryValue: String!,
const queryResults = gql`
  query queryResults($country: [String], $today:String!){
    results (countries: $country, date: { lt: $today }) {
      country {
        name
      }
      date
      confirmed
      deaths
      recovered
    }
  }`;


export class GraphComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const countrySelected = this.props.countrySelected.value;
    console.log(typeof countrySelected)
  return (
    <ApolloProvider client={client}>
      <Query
        query={queryResults} 
        variables = {{country: countrySelected, today: date}}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          
          var confirmed_array = [];
          var death_case_array = [];
          var recovered_array = [];
          data && data.results && data.results.map((result) => {
            confirmed_array.push({ y: result.confirmed, label: result.date })
            death_case_array.push({ y: result.deaths, label: result.date })
            recovered_array.push({ y: result.recovered, label: result.date })
          });
          
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
            },
            {
              type: "spline",
              name: "recovered",
              showInLegend: true,
              dataPoints: recovered_array
            }]
          }

          return(
            <div>
              <CanvasJSChart options = {options}
                /* onRef = {ref => this.chart = ref} */
              />        
            </div>
          );
        }}
      </Query>
    </ApolloProvider>);
  }
}

export default GraphComponent;

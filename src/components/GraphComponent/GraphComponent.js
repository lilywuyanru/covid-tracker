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

export class GraphComponent extends Component {
  render() {
  return (
    <ApolloProvider client={client}>
      <Query
        query={gql`
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
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          
          var confirmed_array = [];
          var death_case_array = [];
          
          data && data.results && data.results.map((result) => {
            confirmed_array.push({ y: result.confirmed, label: result.date })
            death_case_array.push({ y: result.deaths, label: result.date })
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

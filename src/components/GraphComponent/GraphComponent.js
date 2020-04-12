 // eslint-disable-next-line
import React, { Component } from 'react';
import { Query } from "react-apollo";
import CanvasJSReact from '../../canvasjs.react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import {QUERY_BY_COUNTRY} from '../QueryComponent/QueryComponent.js'
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
        query={QUERY_BY_COUNTRY} 
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
              text: "Covid 19 Data",
              fontFamily: "Helvetica",
            },
            height:300,
            width:800,
            axisY : {
              title: "NumberOfCases",
              includeZero: true,
              fontFamily: "Helvetica"
            },
            toolTip: {
              shared: true
            },
            data: [{
              type: "spline",
              name: "confirmed",
              showInLegend: true,
              dataPoints: confirmed_array,
              fontFamily: "Helvetica"
            },
            {
              type: "spline",
              name: "death",
              showInLegend: true,
              dataPoints: death_case_array,
              fontFamily: "Helvetica"
            },
            {
              type: "spline",
              name: "recovered",
              showInLegend: true,
              dataPoints: recovered_array,
              fontFamily: "Helvetica"
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

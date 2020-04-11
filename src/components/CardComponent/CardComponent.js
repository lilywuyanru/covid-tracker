import React, { Component } from 'react';
import { Query } from "react-apollo";
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import {QUERY_BY_COUNTRY} from '../QueryComponent/QueryComponent.js'

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

export class CardComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const countrySelected = this.props.countrySelected.value;
    console.log("render card component")
  return (
    <ApolloProvider client={client}>
      <Query
        query={QUERY_BY_COUNTRY} 
        variables = {{country: countrySelected, today: date}}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          
          var todays_data = data && data.results && data.results.slice(-1).pop()

          console.log(todays_data)

          return(
            <div>
              <p>The country you selected is {todays_data.country.name}</p>
              <p>as of {todays_data.date}, here are the stats about covid19</p>
              <p>Confimed: {todays_data.confirmed}</p>
              <p>Deaths: {todays_data.deaths}</p>
              <p>Recovered: {todays_data.recovered}</p>
            </div>
          );
        }}
      </Query>
    </ApolloProvider>); 
  }
}

export default CardComponent;

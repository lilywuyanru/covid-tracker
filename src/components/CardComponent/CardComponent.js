import React, { Component } from 'react';
import { Query } from "react-apollo";
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import {QUERY_BY_COUNTRY} from '../QueryComponent/QueryComponent.js'
import 'bootstrap/dist/css/bootstrap.css';
import './CardComponent.css';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://covid19-graphql.now.sh/'
})

const client = new ApolloClient({
  cache,
  link
})

var today = new Date();
var date=parseInt(today.getMonth()+1) + "/" + today.getDate() + "/"+today.getFullYear();

export class CardComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const countrySelected = this.props.countrySelected.value;

    console.log("render card component")
    console.log(date)
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
            <div class="card-deck">
              <div class="card border-warning mb-3" style={{backgroundColor: "rgba(255, 240, 189, 0.3)"}}>
                <div class="card-body text-warning">
                  <h5 class="card-title" style={{fontFamily: "Helvetica"}}>Confirmed</h5>
                  <h3 class="card-text">{todays_data.confirmed}</h3>
                </div>
              </div>
              <div class="card border-success mb-3" style={{backgroundColor: "rgba(183, 255, 173, 0.2)"}}>
                <div class="card-body text-success">
                  <h5 class="card-title">Recovered</h5>
                  <h3 class="card-text">{todays_data.recovered}</h3>
                </div>
              </div>
              <div class="card border-danger mb-3"  style={{backgroundColor: "rgba(250, 0, 0, 0.2)"}}>
                <div class="card-body text-danger">
                  <h5 class="card-title">Deaths</h5>
                  <h3 class="card-text">{todays_data.deaths}</h3>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    </ApolloProvider>); 
  }
}

export default CardComponent;

import React, { Component} from "react";
import Select from 'react-select';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { GraphComponent } from '../GraphComponent/GraphComponent.js';
import { CardComponent } from '../CardComponent/CardComponent.js';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://covid19-graphql.now.sh/'
})

const client = new ApolloClient({
  cache,
  link
})

export class SearchSelection extends Component {
  state = {
    selectedOption: {
      value: null,
      lable: null
    }
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  render() {
      const { selectedOption } = this.state;

      return (
        <ApolloProvider client={client}>
        <Query
        query={gql`
        {
          countries {
            name
          }
        }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
            
          var country_array = [];
        
          data && data.countries && data.countries.map((country) => {
            country_array.push({value: country.name, label: country.name})
          });
          console.log(country_array)
                
        return(
          <div>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={country_array}
            />
            <br />
            <CardComponent countrySelected={selectedOption}/>
            <br />
            <GraphComponent countrySelected={selectedOption}/>
          </div>
        );
        
        }}
        </Query>
      </ApolloProvider>);
    }
  }

export default SearchSelection;
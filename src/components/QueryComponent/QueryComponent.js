import gql from 'graphql-tag'

export const QUERY_BY_COUNTRY = gql`
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
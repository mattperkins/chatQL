import { gql } from 'apollo-server-express'

// create root/parent definition for modularised schema extend option
export default gql`
 type Query {
  # cannot be empty so use:
  _: String
 } 

 type Mutation {
  _: String
 }

 type Subscription {
  _: String
 }
`

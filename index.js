const express = require('express')
const graphQlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const testDb = {
 users: [
  { id: '1', email: 'fred@email.com', name: 'Fred'},
  { id: '2', email: 'sandy@email.com', name: 'Sandy'}
 ]
}

const schema = buildSchema(`
 type Query {
  users: [User!]!
 }

 type User {
  id: ID!
  email: String!
  name: String
  avatarUrl: String
 }
`)

const rootValue = {
 users: () => testDb.users
}

const app = express()

// middleware
app.use('/graphql', graphQlHTTP({
 schema,
 rootValue,
 graphiql: true
}))

const PORT = 3000
  app.listen(PORT, () => console.log(`running on ${PORT}`))


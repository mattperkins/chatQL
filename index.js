const express = require('express')
const graphQlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const crypto = require('crypto')

const testDb = {
 users: [
  { id: '1', email: 'fred@email.com', name: 'Fred'},
  { id: '2', email: 'sandy@email.com', name: 'Sandy'}
 ]
}

const schema = buildSchema(`
 type Query {
  users: [User!]!
  user(id: ID!): User
 }

 type Mutation {
  addUser(email: String!, name: String): User
 }

 type User {
  id: ID!
  email: String!
  name: String
  avatarUrl: String
 }
`)

// resolvers
const rootValue = {
 users: () => testDb.users,
 user: args => testDb.users.find(user => user.id === args.id),
 addUser: ({ email, name }) => {
  const user = {
   id: crypto.randomBytes(10).toString('hex'),
   email,
   name
  }
  testDb.users.push(user)
  
  return user
 }
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


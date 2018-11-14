const express = require('express')
const graphQlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const crypto = require('crypto')

const testDb = {
 users: [
  { id: '1', email: 'fred@email.com', name: 'Fred'},
  { id: '2', email: 'sandy@email.com', name: 'Sandy'}
 ],
 messages: [
  { id: '1', userId: '1', body: 'hello, world', createdAt: Date.now() },
  { id: '2', userId: '2', body: 'oh, hi', createdAt: Date.now() },
  { id: '3', userId: '3', body: 'what\'s up?', createdAt: Date.now() },
 ]
}

// to access nested data : users > messages 
class User {
 constructor(user) {
  Object.assign(this, user)
 }
 messages() {
  return testDb.messages.filter(message => message.userId === this.id)
 }
}

// [ !]! denotes neither array nor object can be NULL
const schema = buildSchema(`
 type Query {
  users: [User!]!
  user(id: ID!): User
  messages: [Message!]! 
 }

 type Mutation {
  addUser(email: String!, name: String): User
 }

 type User {
  id: ID!
  email: String!
  name: String
  avatarUrl: String
  messages: [Message!]! 
 }

 type Message {
  id: ID!
  body: String!
  createdAt: String!
 }
`)

// resolvers
const rootValue = {
 users: () => testDb.users,
 user: args => testDb.users.find(user => user.id === args.id),
 messages: () => testDb.messages,
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


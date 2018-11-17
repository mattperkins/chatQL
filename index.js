const { ApolloServer, gql} = require('apollo-server')
const crypto = require('crypto')

// inMemory database
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

// Define Schema with a bunch of Type definitions
// [ !]! denotes neither array nor object can be NULL
const typeDefs = gql`
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
`
// object literal
const resolvers = {
 // keys
 Query: {
  users: () => testDb.users,
  user: (root, { id }) => testDb.users.find(user => user.id === user.id),
  messages: () => testDb.messages
 },
 Mutation: {
  addUser: ( root, { email, name }) => {
  const user = {
   id: crypto.randomBytes(10).toString('hex'),
   email,
   name
  }
  testDb.users.push(user)
  
  return user
 }
 },
 User: {
  messages: user => testDb.messages.filter(message => message.userId === user.id)
 }

} // resolvers

// Replace 'resolvers' with 'mocks:true' for dummy data if no inline test DB present above.
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(url));

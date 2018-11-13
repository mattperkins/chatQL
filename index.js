const { graphql, buildSchema } = require('graphql')

const fakeDb = {
 users: [
  { id:  '1', email: 'fred@email.com', name: 'Fred'},
  { id:  '2', email: 'sandy@email.com', name: 'Sandy'}
 ]
}

const schema = buildSchema(`
 type Query {
  users: User
 }

 type User {
  id: ID!
  email: String!
  name: String
  avatarUrl: String
 }
`)

const rootValue = {
 users: () => 
}

graphql(
 schema,
 `
  {
   message
  }
 `,
 rootValue
).then(
 console.log
).catch(
 console.error
)
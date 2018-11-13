const { graphql, buildSchema } = require('graphql')


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
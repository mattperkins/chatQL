const express = require('express')

const app = express()
const PORT = 3000
  app.listen(PORT, () => console.log(`running on ${PORT}`))

// const { graphql, buildSchema } = require('graphql')

// const testDb = {
//  users: [
//   { id: '1', email: 'fred@email.com', name: 'Fred'},
//   { id: '2', email: 'sandy@email.com', name: 'Sandy'}
//  ]
// }

// const schema = buildSchema(`
//  type Query {
//   users: [User!]!
//  }

//  type User {
//   id: ID!
//   email: String!
//   name: String
//   avatarUrl: String
//  }
// `)

// const rootValue = {
//  users: () => testDb.users
// }

// graphql(
//  schema,
//  `
//   {
//    users {
//     id
//     email
//    }
//   }
//  `,
//  rootValue
// ).then(
//  res => console.dir(res, { depth: null })
// ).catch(
//  console.error
// )
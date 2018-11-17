import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// app is from an existing express app
server.applyMiddleware({ app }) 

app.listen({ port: 4000 }, () =>
  console.log(`Server endpoint: http://localhost:4000${server.graphqlPath}`)
)
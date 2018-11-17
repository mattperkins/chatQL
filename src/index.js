import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

const {
  APP_PORT = 4000,
  NODE_ENV = 'development'
} = process.env

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers
})

// app is from an existing express app
server.applyMiddleware({ app })

app.listen({ port: APP_PORT }, () =>
  console.log(`Server endpoint: http://localhost:${APP_PORT}${server.graphqlPath}`)
)

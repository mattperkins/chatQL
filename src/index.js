import mongoose from 'mongoose'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { APP_PORT, IN_PROD, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, SESS_NAME, SESS_LIFETIME, SESS_SECRET, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from '../env.js'

// self invoking async function
(async () => {
  try {
    await mongoose.connect(
      `
  mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
  `,
      { useNewUrlParser: true }
    )

    const app = express()
    app.disable('x-powered-by')

    const RedisStore = connectRedis(session)
    const store = new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT,
      pass: REDIS_PASSWORD
    })

    app.use(session({
      store,
      name: SESS_NAME,
      secret: SESS_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
      }
    }))

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      cors: false,
      playground: IN_PROD ? false : {
        settings: {
          'request.credentials': 'include'
        }
      },
      context: ({ req, res }) => ({ req, res })
    })

    // app is from an existing express app
    server.applyMiddleware({ app })

    app.listen({ port: APP_PORT }, () =>
      console.log(`GQL Playground up @ http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.log(e)
  }
})()

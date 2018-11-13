const { graphql, buildSchema } = require('graphql')

const schema = buildSchema(`
 type Query {
  message: String
 }
`)

const rootValue = {
 message: () => 'Working!'
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
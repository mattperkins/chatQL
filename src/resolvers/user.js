import { User } from '../models'

export default {
  Query: {
    users: (root, arg, context, info) => {
      // Auth, Projection, Pagination

      return User.find({})
    },
    user: (root, arg, context, info) => {

    }
  },
  Mutation: {
    signUp: (root, arg, context, info) => {

    }
  }
}

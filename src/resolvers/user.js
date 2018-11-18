import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'

export default {
  Query: {
    users: (root, arg, context, info) => {
      // Auth, Projection, Pagination, Sanitisation

      return User.find({})
    },
    user: (root, { id }, context, info) => {
      // Auth, Projection, Sanitisation
      // Utility method
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }

      return User.findById(id)
    }
  },
  Mutation: {
    signUp: (root, arg, context, info) => {

    }
  }
}

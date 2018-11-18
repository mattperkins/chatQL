import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { SignUp } from '../schemas_joi'
import { User } from '../models'

export default {
  Query: {
    users: (root, args, context, info) => {
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
    signUp: async (root, args, context, info) => {
      // !Auth, Validation

      await Joi.validate(args, SignUp, { abortEarly: false })
      return User.create(args)
    }
  }
}

// args = an object containing all parameters passed from the client

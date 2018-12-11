import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { signUp, signIn, signOut } from '../schemas_joi'
import { User } from '../models'
import * as Auth from '../auth'

export default {
  Query: {
    me: (root, args, { req }, info) => {
    // Projection

      Auth.checkSignedIn(req)
      return User.findById(req.session.userId)
    },
    users: (root, args, { req }, info) => {
      // Auth, Projection, Pagination, Sanitisation

      Auth.checkSignedIn(req)

      return User.find({})
    },
    user: (root, { id }, { req }, info) => {
      // Auth, Projection, Sanitisation
      // Utility method
      Auth.checkSignedIn()

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }

      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // !Auth, Validation
      Auth.checkSignedOut(req)

      await Joi.validate(args, signUp, { abortEarly: false })
      const user = await User.create(args)
      req.session.userId = user.id
      return user
    },
    signIn: async (root, args, { req }, info) => {
      const { userId } = req.session

      if (userId) {
        return User.findById(userId)
      }
      await Joi.validate(args, signIn, { abortEarly: false })

      const user = await Auth.attemptSignIn(args.email, args.password)

      req.session.userId = user.id
      return user
    },
    signOut: (root, args, { req, res }, info) => {
      Auth.checkSignedOut(req)

      return Auth.signOut(req, res)
    }
  }
}

// args = an object containing all parameters passed from the client

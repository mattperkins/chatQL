import mongoose from 'mongoose'
import { hash } from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      // check to see if email address already exists
      validator: email => User.doesntExist({ email }),
      message: ({ value }) => `Email ${value} has already been taken` // later: need to add SSL Security
    }
  },
  username: {
    type: String,
    validate: {
      // check to see if username address already exists
      validator: username => User.doesntExist({ username }),
      message: ({ value }) => `Username ${value} has already been taken` // later: need to add SSL Security
    }
  },
  name: String,
  // stores password in DB not exposing to graphql API
  password: String
}, {
// createdAt and updatedAt implicit when model updates
  timestamps: true
})

// a hook called before model is saved
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10) // args.password from resolver
  }
})

userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const User = mongoose.model('User', userSchema)

export default User

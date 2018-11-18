import mongoose from 'mongoose'
import { hash } from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  name: String,
  // stores password in DB not exposing to graphql API
  password: String
}, {
// createdAt and updatedAt implicit when model updates
  timestamps: true
})

// a hook called before model is saved
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    hash(this.password) // args.password from resolver
  }
  next()
})

export default mongoose.model('User', userSchema)

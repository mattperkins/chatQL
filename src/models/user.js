import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  name: String
}, {
// createdAt and updatedAt implicit when model updates
  timestamps: true
})

export default mongoose.model('User', userSchema)
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: 'string',
    unique: true,
    require: true
  },
  password: {
    type: 'string',
    require: true
  },
  email: {
    type: 'string',
    require: true
  }
})

export default mongoose.model('user', UserSchema)
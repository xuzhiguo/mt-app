import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Order = new Schema({
  id: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  total: {
    type: Number,
    require: true
  },
  images: {
    type: Array,
    require: true
  },
  status: {
    type: Number,
    require: true
  },
  count: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  time: {
    type: String,
    require: true
  }
})

export default mongoose.model('orders', Order)
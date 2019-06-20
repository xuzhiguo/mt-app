import mongoose from 'mongoose'

const Schema = mongoose.Schema
const poisSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  county: {
    type: String
  },
  areaCode: {
    type: Number
  },
  tel: {
    type: String
  },
  area: {
    type: String
  },
  add: {
    type: String
  },
  type: {
    type: String
  },
  module: {
    type: String
  },
  longtide: {
    type: Number
  },
  latitude: {
    type: Number
  }
})

export default mongoose.model('pois', poisSchema)
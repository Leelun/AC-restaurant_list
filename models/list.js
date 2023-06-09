const mongoose = require('mongoose')
const Schema = mongoose.Schema
const listSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  google_map: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
  
})
module.exports = mongoose.model('List', listSchema)
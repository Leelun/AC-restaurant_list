const mongoose = require('mongoose') // 載入 mongoose
const List = require('../list') // 載入 list model
const resList = require('../../restaurant.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  List.create(resList.results)
  
  console.log('done')
})
const List = require('../list') // 載入 list model
const resList = require('../../restaurant.json')
const db = require('../../config/mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  console.log('mongodb connected!')
  List.create(resList.results)
  
  console.log('done')
})
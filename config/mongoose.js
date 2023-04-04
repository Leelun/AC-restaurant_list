const mongoose = require('mongoose') // 載入 mongoose

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 使用環境變數方法設定連線到 mongoDB

const db = mongoose.connection // 取得資料庫連線狀態

db.on('error', () => { // 連線異常
  console.log('mongodb error!')
})
db.once('open', () => { // 連線成功
  console.log('mongodb connected!')
})
module.exports = db
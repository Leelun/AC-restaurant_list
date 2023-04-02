
const express = require('express') //載入express框架的相關設定
const app = express()
const port = 3000
const mongoose = require('mongoose') // 載入 mongoose
if (process.env.NODE_ENV !== 'production') { //僅在非正式環境時, 使用 dotenv
  
  require('dotenv').config()
}
const exphbs = require('express-handlebars') //載入handlebars樣板引擎的相關設定
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true, useUnifiedTopology: true }) // 使用環境變數方法設定連線到 mongoDB
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => { // 連線異常
  console.log('mongodb error!')
})
db.once('open', () => { // 連線成功
  console.log('mongodb connected!')
})



app.use(express.static('public')) //載入靜態檔案相關設定


const resList = require('./restaurant.json') //載入JSON檔相關設定


//依據設定的路徑回應index的內容
app.get('/', (req, res) => {
  res.render('index', { restaurants: resList.results })
})

//依據設定的路徑回應show的內容
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = resList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
    res.render('show', { restaurant: restaurant })
})

//依據設定的路徑回應search的內容
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = resList.results.filter(restaurant => {
    return restaurant.category.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  if (!restaurants.length) {
    res.render('nofind', { keyword: keyword })

  }else {
    res.render('index', { restaurants: restaurants, keyword: keyword })
  }
})



app.listen(port, () => { //啟動並監聽伺服器
  console.log(`express is listening on localhost:${port}`)
})



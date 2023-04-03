
const express = require('express') //載入express框架的相關設定
const app = express()
const port = 3000
const bodyParser = require('body-parser') // 引用 body-parser
const mongoose = require('mongoose') // 載入 mongoose
const List = require('./models/list')
if (process.env.NODE_ENV !== 'production') { //僅在非正式環境時, 使用 dotenv
  require('dotenv').config()
}
const exphbs = require('express-handlebars') //載入handlebars樣板引擎的相關設定
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public')) //載入靜態檔案相關設定
app.use(bodyParser.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理

mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true, useUnifiedTopology: true }) // 使用環境變數方法設定連線到 mongoDB
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => { // 連線異常
  console.log('mongodb error!')
})
db.once('open', () => { // 連線成功
  console.log('mongodb connected!')
})






app.get('/', (req, res) => { //瀏覽所有資料
  List.find()
  .lean()
  .then(lists => res.render('index', { lists }))
  .catch(error => console.log(error))
})

app.get('/lists/new', (req, res) => { //新增清單畫面
  res.render('new')
})

app.post('/lists', (req,res) => {
  const { name, name_en, category, image, rating, location, phone, google_map, description  } = req.body
  List.create({ name, name_en, category, image, rating, location, phone, google_map, description })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})
//依據設定的路徑回應show的內容
// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const restaurant = resList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id
//   )
//     res.render('show', { restaurant: restaurant })
// })

//依據設定的路徑回應search的內容
// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword.trim()
//   const restaurants = resList.results.filter(restaurant => {
//     return restaurant.category.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name.toLowerCase().includes(keyword.toLowerCase())
//   })
//   if (!restaurants.length) {
//     res.render('nofind', { keyword: keyword })

//   }else {
//     res.render('index', { restaurants: restaurants, keyword: keyword })
//   }
// })

app.listen(port, () => { //啟動並監聽伺服器
  console.log(`express is listening on localhost:${port}`)
})



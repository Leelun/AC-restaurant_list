
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

app.get('/list/:id', (req, res) => { //依據設定的路徑回應detail的內容
  const id = req.params.id
  List.findById(id)
  .lean()
  .then((list) => res.render('detail', { list }))
  .catch(error => console.log(error))
})

app.get('/list/:id/edit', (req, res) => { //依據設定的路徑呼叫edit的頁面
  const id = req.params.id
  List.findById(id)
    .lean()
    .then((list) => res.render('edit', { list }))
    .catch(error => console.log(error))
})

app.post('/list/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, image, rating, location, phone, google_map, description } = req.body
  List.findById(id)
  .then(list => {
    list.name = name
    list.name_en = name_en
    list.category = category
    list.image = image
    list.rating = rating
    list.location = location
    list.phone = phone
    list.google_map = google_map
    list.description = description
    list.save()
  })
  .then(()=> res.redirect(`/list/${id}`))
  .catch(error => console.log(error))
})

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



const express = require('express') //載入express框架的相關設定
const routes = require('./routes') // 引用路由器
require('./config/mongoose')
const app = express()
const port = 3000
const bodyParser = require('body-parser') // 引用 body-parser
const methodOverride = require('method-override') // 載入 method-overrid
if (process.env.NODE_ENV !== 'production') { //僅在非正式環境時, 使用 dotenv
  require('dotenv').config()
}
const exphbs = require('express-handlebars') //載入handlebars樣板引擎的相關設定
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public')) //載入靜態檔案相關設定
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(bodyParser.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(routes) // 將 request 導入路由器









// app.get('/search', (req, res) => { //依據設定的路徑回應search的內容
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



//載入express框架的相關設定
const express = require('express')
const app = express()
const port = 3000
//載入handlebars樣板引擎的相關設定
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//載入靜態檔案相關設定
app.use(express.static('public'))

//載入JSON檔相關設定
const resList = require('./restaurant.json')


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


//啟動並監聽伺服器
app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})



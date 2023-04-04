const express = require('express')
const router = express.Router()
const List = require('../../models/list') // 引用 List model

router.get('/new', (req, res) => { //CRUD的CREATE-1 呼叫新增餐廳清單的畫面
  res.render('new')
})

router.post('/', (req, res) => { //CRUD的CREATE-2 新增餐廳清單至資料庫，重新渲染主頁畫面
  const { name, name_en, category, image, rating, location, phone, google_map, description } = req.body
  List.create({ name, name_en, category, image, rating, location, phone, google_map, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => { //CRUD的READ 依據設定的路徑回應detail的內容
  const id = req.params.id
  List.findById(id)
    .lean()
    .then((list) => res.render('detail', { list }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => { //CRUD的UPDATE-1 依據設定的路徑呼叫edit的頁面
  const id = req.params.id
  List.findById(id)
    .lean()
    .then((list) => res.render('edit', { list }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => { //CRUD的UPDATE-2 更新資料庫資料
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
    .then(() => res.redirect(`/list/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => { //CRUD的DELETE 刪除資料
  const id = req.params.id
    List.findById(id)
      .then(list => list.remove())
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  
  
})

module.exports = router
const express = require('express')
const router = express.Router()

const List = require('../../models/list') // 引用 List model

router.get('/', (req, res) => { //瀏覽所有餐廳清單
  List.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(lists => res.render('index', { lists }))
    .catch(error => console.log(error))
})

module.exports = router // 匯出路由模組
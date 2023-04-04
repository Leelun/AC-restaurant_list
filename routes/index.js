const express = require('express')  // 引用 Express
const router = express.Router() //引用Express 路由器

const home = require('./modules/home')// 引入 home 模組程式碼
router.use('/', home) // 將網址結構符合 / 字串的 request 導向 home 模組
const lists = require('./modules/lists') //引入 lists 模組程式碼
router.use('/list', lists) // 將網址結構符合 /list 字串的 request 導向 lists 模組

module.exports = router // 匯出路由器
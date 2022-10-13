const express = require('express')

// 导入处理路径的核心模块
const path = require('path')
const expressJoi = require('@escook/express-joi')
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const { add_article_schema } = require('../schema/article')
const { addArticle } = require('../router_handle/article')
const router = express.Router()

router.post('/add', expressJoi(add_article_schema), addArticle)

module.exports = router
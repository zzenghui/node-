const express = require('express')
const router = express.Router()
const { getArticleCates, addArticleCates, deleteCateById, getArtCateById, updateCateById } = require('../router_handle/artcate')
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章分类的验证模块
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate')

// 获取文章分类的列表数据
router.get('/cates', getArticleCates)

//新增文档
router.post('/addcates', expressJoi(add_cate_schema) ,addArticleCates)

//删除文章接口
// 删除文章分类的路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema), deleteCateById)
//获取文章分类
router.get('/cates/:id', expressJoi(get_cate_schema), getArtCateById)
// 更新文章分类的路由
router.post('/updatecate', expressJoi(update_cate_schema), updateCateById)



module.exports = router
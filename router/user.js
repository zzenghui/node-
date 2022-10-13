const express = require('express')
//导入路由处理函数模块
const userHandle = require('../router_handle/user')
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

const router = express.Router()

//注册新用户接口
router.post('/reguser', expressJoi(reg_login_schema), userHandle.regUSer)
//登录接口
router.post('/login', expressJoi(reg_login_schema), userHandle.login)

module.exports = router
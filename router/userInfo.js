const express = require('express')
const { userInfo, changeuserInfo, updatepwd, updateAvatar } = require('../router_handle/userinfo')
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')
const router = express.Router()


//获取用户基本信息的路由
router.get('/userinfo',  userInfo)
//修改用户接口
router.post('/changeUserinfo', expressJoi(update_userinfo_schema), changeuserInfo)
//修改密码及接口
router.post('/updatepwd', expressJoi(update_password_schema), updatepwd)
//更新头像的接口
router.post('/update/avatar', expressJoi(update_avatar_schema), updateAvatar)
module.exports = router
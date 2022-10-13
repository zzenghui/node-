const express = require('express')
const cors = require('cors')
const Joi = require('joi')
const router = require('./router/user')
const articleRouter = require('./router/article')
const userInfoRouter = require('./router/userInfo')
const artcate = require('./router/artcate')
// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
const app = express()



//配置跨域
app.use(cors())
//配置解析表单中间件  只能解析application/x-www-form-urlencoded格式数据
app.use(express.urlencoded({extended: false}))
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})



// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
//路由
app.use('/api',router)
app.use('/my', userInfoRouter)
app.use('/my/article',artcate)
app.use('/my/article', articleRouter)









// 4.1 错误级别中间件
app.use(function (err, req, res, next) {
    // 4.1 Joi 参数校验失败
    if (err instanceof Joi.ValidationError) {
        return res.cc(err)
    }
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 4.2 未知错误
    res.cc(err)
})


app.listen(800,() => {
    console.log('api server running at http://127.0.0.1:800')
})
const db = require('../db/index')
const jwt = require('jsonwebtoken')
const config = require('../config')
//对密码进行加密的包
const bcrypt = require('bcryptjs')
exports.regUSer = (req, res) => {
    const userInfo = req.body
    //对表单数据进行合法性的校验
    // console.log(userInfo);
    if (!userInfo.username || !userInfo.password) {
        return res.cc('用户名或密码不合法')
        // res.send({
        //     status:1,
        //     msg:'用户名或密码不合法'
        // })
    }
    //检查用户名是否重复
    const sql = 'select * from ev_users where username=?'
    db.query(sql, userInfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
            // res.send({
            //     status:1,
            //     message:err.message
            // }) 
        }
        //判断用户名是否被占用
        if (results.length > 0) {
            return res.cc('用户名已经被占用')
            // res.send({
            //     status:1,
            //     messsage:'用户名已经占用'
            // })
        }
        //调用bcrypt.hashSync()对密码进行加密

        userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        //插入新的用户
        const insertSql = 'insert into ev_users set ?'
        db.query(insertSql, { username: userInfo.username, password: userInfo.password }, (err, result) => {
            if (err) {
                return res.cc(err)
                //  res.send({status:1 , message:err.message}) 
            }
            //执行成功,但用户信息未插入成功
            if (result.affectedRows !== 1) {
                return res.cc('用户注册失败,请稍后再试')
                //  res.send({
                //     status:1,
                //     message:'用户注册失败,请稍后再试 '
                // })
            }
            //注册成功
            res.send({
                status: 0,
                message: '注册成功'
            })
        })
    })


}

exports.login = (req, res) => {
    const userinfo = req.body
    const sql = `select * from ev_users where username=?`
    db.query(sql, userinfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户名不存在,登录失败！')
        // TODO：判断用户输入的登录密码是否和数据库中的密码一致
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) {
            return res.cc('密码或用户名错误,登录失败！')
        }
        const user = { ...results[0], password: '', user_pic: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '50h', // token 有效期为 10 个小时
        })
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })
    })
    // res.send('login ok')
}

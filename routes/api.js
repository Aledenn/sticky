var express = require('express');
var router = express.Router();
var Note = require('../models/note').Note

// 1. 获取所有note: GET /api/notes  req:成功：{status:0,data:[{},{}]} 失败:{status:1,errorMsg:"失败的原因"}
// 2. 创建一个note: POST /api/note/create  {note:'hello word'}
// 3. 修改一个note: POST /api/note/edit {note:'new note',id:100}
// 4. 删除 POST /api/note/delete {id:100}
router.get('/notes', function (req, res, next) {
  let query = {raw:true}
  if(req.session.user){
    query.where = {
      uid: req.session.user.id
    }
  }

  Note.findAll(query).then(
    (notes) => {
      res.send({ status: 0, data: notes })
    }
  ).catch(err =>
    res.send({ status: 2, errorMsg: "数据库出错" })
  )
})

router.post('/notes/add', function (req, res, next) {
  if (!req.session.user) {
    res.send({ status: 1, errorMsg: '请先登陆' })
  }

  let uid = req.session.user.id
  let note = req.body.note

  Note.create({ text: note, uid }).then(() => {
    res.send({ status: 0 })
  }).catch((err) => {
    res.send({ status: 1, errorMsg: '数据库出错' })
  })
})
router.post('/notes/edit', function (req, res, next) {
  if (!req.session.user) {
    res.send({ status: 1, errorMsg: '请先登陆' })
  }

  let uid = req.session.user.id

  Note.update({ text: req.body.note }, { where: { id: req.body.id, uid } }).then(() => {
    res.send({ status: 0 })
  }).catch((err) => {
    res.send({ status: 1, errorMsg: err })
  })
})
router.post('/notes/delete', function (req, res, next) {
  if (!req.session.user) {
    res.send({ status: 1, errorMsg: '请先登陆' })
  }

  let uid = req.session.user.id
  Note.destroy({ where: { id: req.body.id, uid } }).then(
    () => {
      res.send({ status: 0 })
    }
  ).catch((err) => {
    res.send({ status: 1, errorMsg:  '数据库出错'})
  })
})

module.exports = router
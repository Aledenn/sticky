var express = require('express');
var router = express.Router();
var Note = require('../models/note').Note

// 1. 获取所有note: GET /api/notes  req:成功：{status:0,data:[{},{}]} 失败:{status:1,errorMsg:"失败的原因"}
// 2. 创建一个note: POST /api/note/create  {note:'hello word'}
// 3. 修改一个note: POST /api/note/edit {note:'new note',id:100}
// 4. 删除 POST /api/note/delete {id:100}
router.get('/notes',function(req,res,next){
  Note.findAll({raw:true}).then(
    (notes) => {
      // console.log(notes);
      res.send({status:0,data:notes})
    }
  ).catch(err=>
    res.send({status:2,errorMsg:err})
  )
})
router.post('/notes/add',function(req,res,next){
  var note = req.body.note
  // console.log(note)
  // res.status(200).send({errorMsg:"我出错了"})
  Note.create({text:note}).then(() => {
    res.send({status:0})
  }).catch((err) => {
    res.send({status:1,errorMsg:err})
  })
})
router.post('/notes/edit',function(req,res,next){
  Note.update({text:req.body.note},{where:{id:req.body.id}}).then(() => {
    res.send({status:0})
  }).catch((err) => {
    res.send({status:1,errorMsg:err})
  })
})
router.post('/notes/delete',function(req,res,next){
  Note.destroy({where:{id:req.body.id}}).then(
    () => {
      res.send({status:0})
    }
  ).catch((err) => {
    res.send({status:1,errorMsg:err})
  })
})

module.exports = router
var express = require('express');
var router = express.Router();

// 1. 获取所有note: GET /api/notes  req:成功：{status:0,data:[{},{}]} 失败:{status:1,errorMsg:"失败的原因"}
// 2. 创建一个note: POST /api/note/create  {note:'hello word'}
// 3. 修改一个note: POST /api/note/edit {note:'new note',id:100}
// 4. 删除 POST /api/note/delete {id:100}
router.get('/notes',function(req,res,next){
  var data = Note.getAll()
  res.send('respone with a abc')
})
router.post('/notes/add',function(req,res,next){
  var note = req.body.note
  console.log(note)
  res.send("sasdf")
})
router.post('/api/notes/edit',function(req,res,next){})
router.post('/api/notes/delete',function(req,res,next){})

module.exports = router
const Sequelize = require('sequelize');
// sqlite不需要用户名密码等
const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // 仅限 SQLite
  storage: '../database/database.sqlite'
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// 定义表
var Note = sequelize.define('note',{
  text:{
    type:Sequelize.STRING
  }
})

// force: true 如果表已经存在，将会丢弃表
// Note.sync().then(() => {
//   // 表已创建
//  Note.create({
//     text:"hello 4444646"
//   }).then(() => {
//     Note.findAll({raw:true}).then(function(notes){
//       console.log(notes)
//     })
//   });
// });


Note.findAll({raw:true,attributes: ['text', 'id'],where:{id:2}}).then(
  (note) => {
    console.log(note);
  }
)

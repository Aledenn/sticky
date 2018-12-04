采用技术：
Express + ejs + webpack

#### webpack
作用：用于打包
```
  entry: path.join(__dirname,'js/app/index.js')  //入口
  output:{
        path:path.join(__dirname,'../public/js'),
        filename:"index.js"
    }                                           // 出口
```

#### onchange
安装onchange,每次代码改变，重新使用webpack打包
```
  npm install onchange -g --save
```
```
  onchange 'src/**/*.js' 'src/**/*.less' --npm run webpack
```
其中**表示无限层级

#### less
方便编写css样式,预编译器，会编译成css
常用语法
变量
```
@color: #000000;

#header {
  color: @color;
}
```
函数
嵌套

#### 后台设计
加个api代表ajax请求
1. 获取所有note: GET /api/notes  req:成功：{status:0,data:[{},{}]} 失败:{status:1,errorMsg:"失败的原因"}
2. 创建一个note: POST /api/note/create  {note:'hello word'}
3. 修改一个note: POST /api/note/edit {note:'new note',id:100}
4. 删除 POST /api/note/delete {id:100}

crud --增删改查
restful风格
1. http://127.0.0.1/user/1 GET  根据用户id查询用户数据
2. http://127.0.0.1/user  POST 新增用户
3. http://127.0.0.1/user  PUT 修改用户信息
4. http://127.0.0.1/user  DELETE 删除用户信息

#### body-parser
nodejs默认没有body，载入body-parser 中间件
```
npm install body-parser --save
```
使用：
```
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
```
但是貌似没有也可以
使用：
```
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```
猜测可能集成了body-Parser,看API文档

#### 调试node程序 --- win安装失败
node-inspector
```
npm install -g node-inspector
```
使用
```
node --debug
```

#### sequelize
安装
```
npm install --save sequelize
```
创建连接
```
const Sequelize = require('sequelize');
const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',  //这里使用sql

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // 仅限 SQLite
  storage: '../database/database.sqlite'
});
```

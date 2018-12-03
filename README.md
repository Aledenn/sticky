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
restful
#ast
## 将源代码转成ast，遍历ast修改节点，重新生成源代码
- esprima ： npm i esprima estraverse escodegen -S （1.js）
## 通过babel插件实现箭头函数转普通函数插件
- npm i @babel/core babel-types -D （2.js）
## 实现es6 class 转es类
- @babel/plugin-transform-classes (3.js)
## 查看代码转ast工具： https://astexplorer.net/
## 使用babel，按需加载第三方库
- babel-plugin-import  （src/index, webpack.config.js）
- 自定义按需加载插件 webpack.config.js + import.js



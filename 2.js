/**
 * 实现尖头函数转化为普通函数babel插件
 */

//babel核心模块
const core = require('@babel/core');
//用来生成或者判断节点的AST语法树的节点
let types = require("@babel/types");
// let arrowFunctionPlugin = require('babel-plugin-transform-es2015-arrow-functions');
let arrowFunctionPlugin = {
    visitor: {
        //如果是箭头函数，那么就会进来此函数，参数是箭头函数的节点路径对象
        ArrowFunctionExpression(path) {
            let node = path.node;
            // hostFunctionEnvironment(path);
            node.type = 'FunctionExpression';
        }
    }
}

let sourceCode = `
const sum = (a, b) => {
    console.log(this);
    return a + b;
}
`;
let targetSource = core.transform(sourceCode, {
    plugins: [arrowFunctionPlugin]
})
console.log(targetSource.code);

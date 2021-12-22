/**
 * babe插件使用
 */
// 把源代码转成抽象语法树
let esprima = require('esprima');
// 遍历语法树，修改树上的语法节点
let estraverse = require('estraverse');
// 生成代码
let escodegen = require('escodegen');

let sourceCode = 'function ast(){}';
let ast = esprima.parse(sourceCode);
let indent = 0;
const padding = () => " ".repeat(indent);

// 遍历，深度优先遍历
estraverse.traverse(ast, {
    enter(node) {
        console.log(padding() + node.type + '进入');
        if (node.type === 'FunctionDeclaration') {
            node.id.name = 'newAst';
        }
        indent += 2;
    },
    leave(node) {
        indent -= 2;
        console.log(padding() + node.type + '离开');
    }
});
// 重新生成代码
let newCode = escodegen.generate(ast);
console.log(newCode)

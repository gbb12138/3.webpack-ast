/**
 * 实现es6 class 转化为 es5类 的babel插件
 */

//babel核心模块
const core = require('@babel/core');
//用来生成或者判断节点的AST语法树的节点
let types = require("@babel/types");
// let transformClassesPlugin = require('@babel/plugin-transform-classes');
let transformClassesPlugin = {
    visitor: {
        // type = ClassDeclaration的节点会走
        //path代表路径，node代表路径上的节点
        ClassDeclaration(path) {
            let node = path.node;
            let id = node.id;//Identifier name:Person
            let methods = node.body.body;//Array<MethodDefinition>
            let nodes = [];
            methods.forEach(method => {
                if (method.kind === 'constructor') {
                    // 创建新的函数 function Person() { this.name = name;  }
                    let constructorFunction = types.functionDeclaration(
                        id,
                        method.params,
                        method.body
                    );
                    nodes.push(constructorFunction);
                } else {
                    // Person.prototype.getName
                    let memberExpression = types.memberExpression(
                        types.memberExpression(
                            id, types.identifier('prototype')
                        ), method.key
                    )
                    // function () { return this.name }
                    let functionExpression = types.functionExpression(
                        null,
                        method.params,
                        method.body
                    )
                    // 赋值语句， 符号， 左侧，右侧
                    let assignmentExpression = types.assignmentExpression(
                        '=',
                        memberExpression,
                        functionExpression
                    );
                    nodes.push(assignmentExpression);
                }
            })
            if (nodes.length === 1) {
                //单节点用replaceWith
                //path代表路径，用nodes[0]这个新节点替换旧path上现有老节点node ClassDeclaration
                path.replaceWith(nodes[0]);
            } else {
                //多节点用replaceWithMultiple
                path.replaceWithMultiple(nodes);
            }
        }
    }
}


let sourceCode = `
class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
`;
// 首先core将源代码转成ast语法树，然后在遍历ast语法树的时候，读插件配置，如果有插件，插件修改ast树，插件处理完成重新生成代码
let targetSource = core.transform(sourceCode, {
    plugins: [transformClassesPlugin]
})
console.log(targetSource.code);

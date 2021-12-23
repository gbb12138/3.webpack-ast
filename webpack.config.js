const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',  // lodash 按需加载
                    options: {
                        plugins:[
                            // 使用babel-plugin-import实现按需加载
                            // [
                            //     "import",
                            //     {
                            //         // 指定要按需加载的模块
                            //         "libraryName": "lodash",
                            //         // 按需加载的目录，默认会找lib,为空是根目录
                            //         "libraryDirectory": "",
                            //     }
                            // ]

                            // 使用自定义插件实现按需加载
                            [
                                // 引入当前目录下的import.js
                                path.resolve(__dirname, 'import.js'),
                                {
                                    "libraryName": "lodash",
                                    "libraryDirectory": "",
                                }
                            ],
                            // 自定义日志插件
                            [
                                path.resolve(__dirname, 'log.js')
                            ],
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
}

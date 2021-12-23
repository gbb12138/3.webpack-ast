const path = require('path');
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
                            [
                                "import",
                                {
                                    // 指定要按需加载的模块
                                    "libraryName": "lodash",
                                    // 按需加载的目录，默认会找lib,为空是根目录
                                    "libraryDirectory": "",
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [

    ]
}

const fs = require('fs')
const webpack = require('webpack')
const path = require('path')

module.exports = {
    mode: 'development',
    /**
     * examples 多个子目录，每个子目录下有个app.ts,作为入口文件。
     * entries 搜集了每个目录的入口文件，并且每个入口文件还引入了用于热更新的文件
     * entries {目录名： 入口文件}
     */
    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        const fullDir = path.join(__dirname, dir)
        const entry = path.join(fullDir, 'app.ts')
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            entries[dir] = ['webpack-hot-middleware/client', entry]
        }
        return entries
    }, {}),
    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        publicPath: '/__build__/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader'
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
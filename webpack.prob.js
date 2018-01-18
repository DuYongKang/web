const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin"); //创建时消除没用到的方法，前提是用import导入。
const common = require("./webpack.common");
const webpack = require('webpack');
module.exports = merge(common, {
  plugins: [
    // new UglifyJSPlugin({
    //   sourceMap: true//在开发代码中使用源码映射
    // }),//还有其他的代码缩减插件，例如BabelMinifyWebpackPlugin ClosureCompilerPlugin
    new webpack.DefinePlugin({
        'process.env':{
            'NODE_ENV':JSON.stringify('production')
        }
    })    
    ]
});

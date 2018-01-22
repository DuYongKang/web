const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//修复修改后的文件名
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack  = require('webpack');
console.log(__dirname)
console.log('test')
module.exports = {

    entry:{
        app: './src/index.js',
        // print: './src/print.js'
        // anoteher: './src/another-module.js'
        vendor: [
            'lodash'
        ]
    },
    output: {
        // filename: '[name].bundle.js',
        filename: '[name].[chunkhash].js',
        chunkFilename:'[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath:"./"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),//自动清理webpack目录
        new HtmlWebpackPlugin({
            title:'Codf Splitting'
        }),
        //注意，引入顺序在这里很重要。CommonsChunkPlugin 的 'vendor' 实例，必须在 'manifest' 实例之前引入
        new webpack.HashedModuleIdsPlugin(),//保持引入的第三包生成的bundle不变
        new webpack.optimize.CommonsChunkPlugin({//注意顺序,
            name:'vendor'//指定公共 bundle 的名称
        }),
        new webpack.optimize.CommonsChunkPlugin({
                  name: 'manifest'
                }),
        new webpack.optimize.CommonsChunkPlugin({//去除重复的导包
            name:'runtime'
        })
    ]

};
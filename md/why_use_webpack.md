1.显然，脚本依赖于外部库。
2.如果缺少一个依赖项，或者包含在错误的顺序中，应用程序将无法正常工作。
3.如果包括但不使用依赖项，浏览器将被迫下载不必要的代码。


了解4个核心概念：
entry:此图的起始点称为入口点。入口点告诉webpack在哪里开始和遵循依赖关系图，以知道如何打包。您可以将应用程序的入口点作为上下文根或第一个文件来启动应用程序。
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
作为经验法则:对于每个HTML文档使用一个entry point。

output:告诉webpack如何处理绑定代码。只能指定一个输出
必要参数：
 output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
}

如果您的配置创建的不仅仅是一个“块”(比如多个入口点，或者使用像CommonsChunkPlugin这样的插件)，那么您应该使用替换来确保每个文件都有一个惟一的名称
output: {
    filename: '[name].js',//指定一个输出
    path: __dirname + '/dist'
  }

如果在编译时不知道公共路径，则可以省略它，并在入口点设置__webpack_public_path__。


npm install --save-dev css-loader
module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
    ]
  }
loaders:在webpack中加载器将这些文件转换为模块，因为它们被添加到您的依赖项图中。
在高级别上，加载器在webpack配置中有两个用途。
1.识别哪些文件或文件应该由某个加载器进行转换。(测试属性)
2.转换这些文件，这样它们就可以添加到您的依赖关系图(最终您的包)。(用property)

module: {//注意外围的module
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }

另外也可以在文件中通过import导入，但是只要有可能尽量使用上面的方法，这样可以减少源代码中的样板文件，可以更快的调试和定位
import Styles from 'style-loader!css-loader?modules!./styles.css';
特点：
1.加载器可以连接。它们被应用到资源的管道中。一串装载机按时间顺序编列。加载器链中的第一个加载器返回一个值到下一个。在最终加载程序中，webpack期望返回JavaScript
2.加载器可以是同步的或异步的。
3.加载器运行在节Node.js可以做所有可能的事情。
4.加载器运行在节点。可以做所有可能的事情。
5.加载器也可以配置一个选项对象
6.正常的模块可以通过包导出一个loader使用加载器字段的json。
7.插件可以给加载器更多的功能。
8.加载器可以发出附加的任意文件。




plugins:webpack插件是一个具有apply属性的JavaScript对象。这个应用属性由webpack编译器调用，可以访问整个编译生命周期。
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
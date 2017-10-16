var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');   //自动打开浏览器

//引入glob
var glob = require('glob');
var srcDir = path.resolve(process.cwd(), 'src');     //根目录文件
//entries函数
var entries= function () {
    var jsDir = path.resolve(srcDir, '');       //js打包入口文件 (js)
    var entryFiles = glob.sync(jsDir + '/*.{js,jsx}');
    var map = {};

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    return map;
};

module.exports = {
  // entry: {
  //     index: "./src/index.js",
  //     index2: "./src/index2.js"
  // },
  entry: entries(),
  output: {
      path: path.join(__dirname, 'dist'),     //打包输出的路径
      filename: './js/[name].js',               //打包后的名字
      publicPath: "/"                //html引用路径，在这里是本地地址。
  },
  module: {
      loaders: [
          {test: /\.js$/, loader: "babel"},
          //{test: /\.css$/, loader: "style!css"},
          //{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")}
          {test: /\.(jpg|png)$/, loader: "url?limit=8192"},
          {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")}
      ]
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin('./js/common.js'),
      new ExtractTextPlugin("./css/[name].css")
  ]
};

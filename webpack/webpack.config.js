var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// var OpenBrowserPlugin = require('open-browser-webpack-plugin');   //自动打开浏览器

//引入glob
var glob = require("glob");
var srcDir = path.resolve(process.cwd(), "src");     //根目录文件
//entries函数
var entries= function () {
    var jsDir = path.resolve(srcDir, "");       //js打包入口文件 (js)
    var entryFiles = glob.sync(jsDir + "/js/*.{js,jsx}");
    var map = {};

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = path.basename(filePath,".js");
        map[filename] = filePath;
    }
    return map;
};
//plugins
var plugin=[];
plugin.push(new webpack.optimize.CommonsChunkPlugin("./js/common.js"));
plugin.push(new ExtractTextPlugin("./css/[name].css"));
var pageFiles = glob.sync(srcDir+"/view/*.html");
for(var chunkname in pageFiles){
  var conf = {
    filename: path.basename(pageFiles[chunkname],".html")+".html",
    template: pageFiles[chunkname],
    // inject: true,
    chunks: ["common",path.basename(pageFiles[chunkname],".html")],  //此处是载入提取的公共js，以及html同名js
    hash: true,
    title:"WebpackPage",
    minify: {
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false  //删除空白符与换行符
    },
  }
  // conf.title = chunkname;
  plugin.push(new HtmlWebpackPlugin(conf));
}
module.exports = {
  // entry: {
  //     index: "./src/index.js",
  //     index2: "./src/index2.js"
  // },
  entry: entries(),
  output: {
      path: path.join(__dirname, "dist"),     //打包输出的路径
      filename: "./js/[name].js",               //打包后的名字
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
  plugins:plugin
  // plugins: [
  //     new webpack.optimize.CommonsChunkPlugin('./js/common.js'),
  //     new ExtractTextPlugin("./css/[name].css"),
  //     new HtmlWebpackPlugin()
  // ]
};

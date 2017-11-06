var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
var jsEentry=entries();

//plugins
var plugins=function(){
  var plugin=[
    new CleanWebpackPlugin(
         ['dist/css/*.*.css','dist/js/*.*.js','dist/img/'],　  //匹配删除的文件
         {
             root: __dirname,       　　　　　　　　　　//根目录
             verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
             dry:      false        　　　　　　　　　　//启用删除文件
         }
     ),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "./js/common.[chunkhash:8].js"
    }),
    new ExtractTextPlugin("./css/[name].[contenthash:8].css")
  ];
  var pageFiles = glob.sync(srcDir+"/view/*.html");
  for(var chunkname in pageFiles){
    var conf = {
      filename: path.basename(pageFiles[chunkname],".html")+".html",
      template: pageFiles[chunkname],
      inject: true,
      chunks: ["common",path.basename(pageFiles[chunkname],".html")],  //此处是载入提取的公共js，以及html同名js
      hash: false,
      title:"WebpackPage",
      minify: {
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: false  //删除空白符与换行符
      },
    }
    plugin.push(new HtmlWebpackPlugin(conf));
  }
  return plugin;
}

var config = {
  entry: jsEentry,
  output: {
      path: path.join(__dirname, "dist"),     //打包输出的路径
      filename: "./js/[name].[chunkhash:8].js",               //打包后的名字
      publicPath: ""                //html引用路径，在这里是本地地址。
  },
  module: {
      rules: [
          {
            test: /\.js$/,
             use: ["babel-loader"]
          },
          {
            test: /\.(jpg|png)$/,
            use: 'url-loader?limit=8192&name=/img/[name].[hash:8].[ext]&publicPath=..'
            // use: [{    //编译过程有问题  https://github.com/webpack/loader-utils/issues/56
            //   loader:"url-loader",
            //   options: {
            //       limit: '8192',
            //       name:"/img/[name].[hash:8].[ext]",
            //       publicPath:"..",  //打包文件中引用文件的路径前缀
            //       // outputPath:"" //输出文件路径前缀(如 /img/xxx)
            //   }
            // }]
          },
          {
            test: /\.scss$/,
            use:ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: ["css-loader","autoprefixer-loader","sass-loader"]
            })
          }
      ]
  },
  plugins:plugins()
};

module.exports = config;

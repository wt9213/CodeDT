require("../css/reset.scss");
require("../css/index2.scss");
import utils from "../lib/utils.js"
// var utils=require("../lib/utils.js");
var jpg=require("../assets/img/kakaxi.jpg");
var png=require("../assets/img/public/plus.png");

if(utils.isPC()){
  alert("Is PC")
}else {
  alert("Not PC")
}

var template = document.getElementsByTagName("body")[0];
template.innerHTML="<img src="+jpg+" style='height:200px;'><br><br><img src="+png+">";

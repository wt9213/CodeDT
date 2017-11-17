// document.write("It works.");
// require("!style!css!./style.css");
require("../css/reset.scss");
require("../css/style.scss");
var utils=require("../lib/utils.js");
// require("./style2.scss");
console.log(utils.getRequest());
var txt=document.getElementById("txt");
txt.textContent=require("../lib/content.js");

require("../css/reset.scss");
require("../css/style2.scss");
// import utils from "../lib/utils.js"
var utils=require("../lib/utils.js");
if(utils.isPC()){
  alert("isPC")
}else {
  alert("not isPC")
}
document.write("It works.");

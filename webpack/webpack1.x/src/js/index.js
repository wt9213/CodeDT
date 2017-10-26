// document.write("It works.");
// require("!style!css!./style.css");
require("../css/reset.scss");
require("../css/style.scss");
var utils=require("../lib/utils.js");
// require("./style2.scss");
console.log(utils.getRequest());
document.write(require("../lib/content.js"));

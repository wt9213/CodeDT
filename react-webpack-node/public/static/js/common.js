/**
 * Created by tengwang on 2017/8/2.
 */
String.prototype.format = function(args) {   // "文字文字{0}，文字{1}文字".format(111,222)
   var result = this;
   if (arguments.length > 0) {
       if (arguments.length == 1 && typeof (args) == "object") {
           for (var key in args) {
               if(args[key]!==undefined){
                   var reg = new RegExp("({" + key + "})", "g");
                   result = result.replace(reg, args[key]);
               }
           }
       }
       else {
           for (var i = 0; i < arguments.length; i++) {
               if (arguments[i] !== undefined) {
　　　　　　　　　　　var reg2= new RegExp("({)" + i + "(})", "g");
                   result = result.replace(reg2, arguments[i]);
               }
           }
       }
   }
   return result;
};

Date.prototype.Format = function(fmt) {   //日期格式化
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
};

var Util={
    isPC: function() {
        var userAgentInfo = window.navigator.userAgent;
        //    var Agents=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"];    //手机端包括ipad
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod"];   //手机端不包括ipad
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    isWeiXin:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    },
    getRequest:function() {
        var url = location.search;
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strArray = str.split("&");
            for (var i = 0; i < strArray.length; i++) {
                theRequest[strArray[i].split("=")[0]] = decodeURI(strArray[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    numToMoney:function (s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    },
    moneyToNum:function (m) {
        return parseFloat(m.replace(/,/g,""));
        // return parseFloat(s.replace(/[^\d\.-]/g, ""));
    },
    removeHtmlTab:function(tab){ //删除所有HTML标签
      return tab.replace(/<[^<>]+?>/g,'');
    },
    escape2Html:function(str){   //转意符换成普通字符
      var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
    },
    html2Escape:function(sHtml){  //普通字符转换成转意符
      return sHtml.replace(/[<>&"]/g,function(c){return {'<':'<','>':'>','&':'&','"':'"'}[c];});
    }
};

//按钮点击效果
(function(){
  var zwdaiBtns=document.getElementsByClassName("btn-effect");
  for(var i=0;i<zwdaiBtns.length;i++){
    zwdaiBtns[i].addEventListener("mousedown", function(e){
      var btnEffect=document.createElement("div");
      btnEffect.style.left = e.offsetX + 'px';
      btnEffect.style.top = e.offsetY + 'px';
      e.target.appendChild(btnEffect);
      setTimeout(function(){
        e.target.removeChild(btnEffect);
      },1700);
    });
  }
})();

/* 自定义 checkbox
 * <label class="checkbox" data-ismall="1" data-status="1" data-role=""></label>
 * data-status  0是未选择，1是选中，2是默认勾选不可编辑
 * data-ismall  1 表示正常大小的控件
 * data-role     该字段表示是否为checkbox组，checkbox组只能勾选一个
 * */
(function($){
    $.fn.wtCheckBox = function(options) {
        var methods ={
            callback:function(){},
        };
        var newMethods = $.extend(methods, options);
        this.unbind();
        this.on("click",function(){
            var self=$(this);
            var status=self.attr("data-status");
            if(status!="2"){
                if(self.attr("data-role")!=undefined&&self.attr("data-role").length>=1){
                    var checkboxRole=self.attr("data-role");
                    $(".checkbox[data-role='"+checkboxRole+"']").attr("data-status","0");
                }
                if(status=="1"){
                    self.attr("data-status","0");
                }else {
                    self.attr("data-status","1");
                }
            }
            newMethods.callback(self);
        });
    };
})(jQuery);
//end

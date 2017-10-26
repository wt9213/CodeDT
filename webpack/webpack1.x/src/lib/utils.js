
var Utils={
    isPC: function() {
        var userAgentInfo = navigator.userAgent;
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
    getRequest:function() {
        var url = location.search;
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strarray = str.split("&");
            for (var i = 0; i < strarray.length; i++) {
                theRequest[strarray[i].split("=")[0]] = decodeURI(strarray[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    fMoney:function (s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 === 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    },
    fNum: function (s) {
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
        var l = s.split(".")[0].split("").reverse(),
            t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 === 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("");
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

module.exports = Utils;

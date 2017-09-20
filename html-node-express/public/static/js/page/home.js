/**
 * Created by tengwang on 2017/8/1.
 */

//公告滚动
(function($){
  $.fn.extend({
    "slideUp":function(value){
      var docthis = this;
      //默认参数
      var defaultValue=$.extend({
        "li_h":"18",
        "time":3500,
        "movetime":900,
        "className":"detail-list"
      },value);
      //向上滑动动画
      function autoani(){
        $("li:first",docthis).animate({"margin-top":-defaultValue.li_h},defaultValue.movetime,function(){
          $(this).css("margin-top",0).appendTo("."+defaultValue.className+"");
        });
      }
      //自动间隔时间向上滑动
      var anifun = setInterval(autoani,defaultValue.time);
      //悬停时停止滑动，离开时继续执行
      $(docthis).children("li").hover(function(){
        clearInterval(anifun);			//清除自动滑动动画
      },function(){
        anifun = setInterval(autoani,defaultValue.time);	//继续执行动画
      });
    }
  });
})(jQuery);

//banner
var mySwiper = new Swiper ('.swiper-container', {
  autoplay: 3000,
  loop: true,
  pagination: '.swiper-pagination',
  paginationClickable :true,
  effect:"fade",
  fade: {
    crossFade: false,
  }
});

$(".n-detail").slideUp({"className":"n-detail"});
$(".invest-detail").slideUp({
  "time":2000,
  "movetime":500,
  "className":"invest-detail"
});

var countUpOptions = {
  useEasing : true,
  useGrouping : true,
  separator : ',',
  decimal : '.',
};
var peopleNumber = new CountUp("p_number", 0, 3999, 0, 2.5, countUpOptions);
peopleNumber.start();
var amount = new CountUp("amount", 0, 5888888.66, 2, 2.5, countUpOptions);
amount.start();
var benefit = new CountUp("benefit", 0, 5888888.00, 2, 2.5, countUpOptions);
benefit.start();

$(window).scroll(function(){
  headerStatus();
});

function headerStatus() {
  var scrollTop = $(document).scrollTop();
  if(scrollTop>=60){
    $("#header").hide();
  } else {
    $("#header").show();
  }
}
headerStatus();

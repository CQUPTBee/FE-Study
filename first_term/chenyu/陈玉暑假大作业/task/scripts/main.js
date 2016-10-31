requirejs.config({
	paths:{
		jquery:'jquery-3.1.0',
		cookie:'jquery.cookie'
	}
});
requirejs(['jquery','cookie'],function($,cookie){
	// $('body').css('background','red');


	//隐藏header-tips模块
  $('.tips').click(function(){
   	$('.header-tips').css('display','none');
   });

  //login模块
  $(function(){
    $('.follow').click(function(){
    $('.appear-login').css('display','block');

  });
  $('.close').click(function(){
    $('.appear-login').css('display','none');
  });
  });
 
//表单验证模块
  $(':input').focus(function(){
  		$(this).addClass("focus");
  }).blur(function(){
  	$(this).removeClass("focus");

  });
  $('form :input').blur(function(){
  	var $parent=$(this).parent().parent();
  	var $username=$('.username');
  	if($(this).is('.username')){
  		 if(this.value==""||this.value<6){
  		var errorMsg='请输入至少6位用户名！';
  		$parent.append('<span class="fail">'+errorMsg+'</span>');
  }else{
  		var okMsg='输入正确！';
  		$parent.append('<span class="success">'+okMsg+'</span>');
  	}
  }
  if($(this).is('.password')){
  		if(this.value==""||this.value<10){
  			 if(this.value==""||this.value<6){
  		var errorMsg='请输入至少10位密码！';
  		$parent.append('<span class="fail">'+errorMsg+'</span>');
  }else{
  		var okMsg='输入正确！';
  		$parent.append('<span class="success">'+okMsg+'</span>');
  	}
  		}
  }
 
  });
// 轮播模块
$(function() { 
var iCountOfImage = 3; // 共三张图片 
var iPreIndex = 0; // 上一次索引位置 
$(".banner-foot ul.nav li a").click(function() { 
var iIndex = $(this).attr("data-index"); 
if(iIndex == iPreIndex) { 
return; // 点击了当前图片，不切换 
} 

$(".banner .list li[data-index="+ iIndex +"]").fadeIn(10); 
$(".banner .list  li[data-index="+ iPreIndex +"]").fadeOut(10); 
iPreIndex = iIndex; 
$(".banner-foot ul.nav li a").removeClass("selected"); 
$(this).addClass("selected"); 
}); 
setInterval(function() { // 自动播放，每5秒触发一次单击事件，来播放幻灯片 
var iNextIndex = (iPreIndex + 1) % iCountOfImage; 
$(".banner-foot ul.nav li a[data-index="+ iNextIndex +"]").click(); 
}, 5000); 
}); 
  
  //tab选项卡模块
$(function(){
 $(".products-design").click(function(){
 	$('.tab-content').show();
 	$('.tab-content1').hide();

 });
$(".programming-language").click(function(){	
 	$('.tab-content1').show();
 	$('.tab-content').hide();
 });
});

//ajax获取课程列表
$(function() {      // 页面加载之后调用
    $.ajax({
    type: "get",
    // dataType: "json",    
    url: "http://study.163.com/webDev/hotcouresByCategory.htm",     
    async: true,　　　　　　　　//是否为异步请求，ture为异步请求，false为同步请求
    success: function(data,textStatus) {    //当请求之后调用。传入返回后的数据，以及包含成功代码的字符串
    // alert(data+textStatus);    //这里会弹出json文件中所有的字符串数据
    var _data= eval("(" + data + ")");  // 将json字符串数据解析成对象
    // alert(_data);
    var $img=$('.tab-content ul li img');
    var $p=$('.tab-content ul li p');
    var $span=$('.tab-content ul li .provider');
    var $learnerCount=$('.tab-content ul li .span-style');
    var $price=$('.tab-content ul li .span-color');
    var $hotImg=$('.hottest-list .item a img');
    var $hotP=$('.hottest-list .item a p');
    var $hotSpan=$('.hottest-list .item a span');
    var $bigImg=$('.big-li img');
    for(var i = 0;i < _data.length;i++){
    // $img[i].src=_data[i].bigPhotoUrl;
    $($img[i]).attr('src',_data[i].bigPhotoUrl);
    // $p[i].innerHTML=_data[i].name;
    $($p[i]).html(_data[i].name);
    $($span[i]).html(_data[i].provider);
    $($learnerCount[i]).html(_data[i].learnerCount);
    $($price[i]).html("￥"+"  "+_data[i].price);
    //最热排行榜模板
    $($hotImg[i]).attr('src',_data[i].smallPhotoUrl);
    $($hotP[i]).html(_data[i].name);
    $($hotSpan[i]).html(_data[i].learnerCount);
    }
    $bigImg.attr('src',_data[0].bigPhotoUrl);
}
     
    });
 });
//最热排行榜上下实现轮播
 // $(function(){
 //        var wrap=$('ul.hottest-list');
 //        var moving;
 //        wrap.hover(function(){
 //            clearInterval(moving);

 //        },function(){
 //            moving=setInterval(function(){
 //         var field=wrap.find('li:first');
 //                var h=field.height();
 //    field.animate({marginTop:-h+'px'},600,function(){
 //        field.css('marginTop',0).appendTo(wrap);
 //    })
 //            },1200)
 //        }).trigger('mouseleave');
 //     });   

     $(function(){
        var wrap=$('ul.hottest-list');
        var moving;
        wrap.hover(function(){
            clearInterval(moving);
            //鼠标移入时，停止移动
        },function(){
        moving=setInterval(function(){
    var field=wrap.find('li:first');//不应设置在外面，是变值
    field.animate(function(){field.hide()},600,function(){
        field.show().appendTo(wrap);
    })
            },1200)
        }).trigger('mouseleave');
     });   

//视频播放模块
$(function(){
$(".play-video").click(function(){
    $(".appear-video").css('display','block');

});
$(".close1").click(function(){
    $(".appear-video").css('display','none');
    });

});

//tab-li放大效果
$(function(){
    $(".tab-content ul li").each(function(){
    $(this).mouseover(function(){
    $('.big-li').css('display','block');
 }).mouseout(function(){
    $('.big-li').css('display','none');
});
    }); 
});





   });
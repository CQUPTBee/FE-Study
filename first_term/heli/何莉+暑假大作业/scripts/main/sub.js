/*define(['sub.Core'], function(core){
	return {
		result: $(function(){
			var $hideNotice = $('.no-notice');
			var $notice = $('.top-notice');
				$hideNotice.click = function() {
					$notice.hide();
				}	
		});
	}
});*/
$(document).ready(function() {
 	noNotice();
 	addAttention();
 	photoScroll();
 	//centerSlide();
 	videoPlay();
 	tabReal();
 	changePage();
 	turnPage();
 	coursesChange();

});

//1.1不再提示效果
function noNotice(){
	//var $hideNotice = $('.no-notice')[0];
	var $notice = $('#J_top_notice');
	$('#J_no_notice').on('click', function() {
	    $notice.slideUp('slow');
	});
}
//1.2加关注部分
function addAttention() {
	var $attention = $('#J_attention');
    		$attention.on('click', function(){
    			//先登录
		    	$('body').append("<div id='mask'></div>");
		    	$('#mask').addClass('mask')
		    				.fadeIn('slow');
		    	$('#LoginBox').fadeIn('slow');
		    });	
		    //文本框不允许为空---按钮触发
	$("#loginbtn").on('click', function () {
	    var txtName = $("#txtName").val();
	    var txtPwd = $("#txtPwd").val();
	    if (txtName == "" || txtName == undefined || txtName == null) {
	        if (txtPwd == "" || txtPwd == undefined || txtPwd == null) {
	            $(".warning").css({ display: 'block' });
	        }
	        else {
	            $("#warn").css({ display: 'block' });
	            $("#warn2").css({ display: 'none' });
	        }
	    }
	    else {
	        if (txtPwd == "" || txtPwd == undefined || txtPwd == null) {
	            $("#warn").css({ display: 'none' });
	            $(".warn2").css({ display: 'block' });
	        }
	        else {
	            $(".warning").css({ display: 'none' });
	        }
	    }
	});
	//文本框不允许为空---单个文本触发
	$("#txtName").on('blur', function () {
	    var txtName = $("#txtName").val();
	    if (txtName == "" || txtName == undefined || txtName == null) {
	        $("#warn").css({ display: 'block' });
	    }
	    else {
	        $("#warn").css({ display: 'none' });
	    }
	});
	$("#txtName").on('focus', function () {
	    $("#warn").css({ display: 'none' });
	});
	//
	$("#txtPwd").on('blur', function () {
	    var txtName = $("#txtPwd").val();
	    if (txtName == "" || txtName == undefined || txtName == null) {
	        $("#warn2").css({ display: 'block' });
	    }
	    else {
	        $("#warn2").css({ display: 'none' });
	    }
	});
	$("#txtPwd").on('focus', function () {
	    $("#warn2").css({ display: 'none' });
	});
	//关闭
	$(".close_btn").hover(function () { $(this).css({ color: 'black' }) }, function () { $(this).css({ color: '#999' }) }).on('click', function () {
	    $("#LoginBox").fadeOut("fast");
	    $("#mask").css({ display: 'none' });
	});
}
/*function addAttention() {
	var CookieUtil = {
		//获取cookie的值
		get: function(name) {
			var cookieName = encodeURIComponent(name) + "=",
				cookieStart = document.cookie.indexOf(cookieName),
				cookieValue = null;

				if(cookieStart > -1){
					var cookieEnd = document.cookie.indexof(";", cookieStart);
						if(cookieEnd == -1) {
							cookieEnd = document.cookie.length;
						}
						cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
				}

				return cookieValue;
		},
		//设置cookie的值
		set: function(name, value, expires, path, domain, secure) {
			var cookieText = encodeURIComponent(name) + "=" + 
							 encodeURIComponent(value);
			if(expires instanceof Date) {
				cookieText += "; expires=" + expires.toGMTString();
			}

			if(path) {
				cookieText += "; path=" + path;
			}

			if(domain) {
				cookieText += "; domain=" + domain;
			}

			if(secure) {
				cookieText += "; secure";
			}

			document.cookie = cookieText;
		},

		//删除cookie
		unset: function (name, value, path, domain, secure) {
			this.set(name, "" , new Data(0), path, domain, secure);
		}
	}
    var cookie = CookieUtil;
   	document.cookie = cookie.set('loginSuc', 0)+
    				cookie.set('followSuc', 0);
    console.log(cookie.get('loginSuc'));

    var $attention = $('#J_attention');
    	if(!cookie.get('loginSuc')) {
    		$attention.on('click', function(){
    			//先登录
		    	$('body').append("<div id='mask'></div>");
		    	$('#mask').addClass('mask')
		    				.fadeIn('slow');
		    	$('#LoginBox').fadeIn('fast');
		    });	    
    	}
    }  /*else { 
    	$attention.click = function(){	    	
	    	cookie.attention = followSuc;
	    	//按钮变成已关注	    	
	    	$attention.html().clear
	    				.next().clear()
	    				.next().clear()
	    				.html('<div class="already-att"><span>已关注</span><a>取消</a></div>');
    	}
    }
    var url = 'http://study.163.com/webDev/attention.htm';
    ajax(url, cSucc, cFailed);
    function cSucc(num){
    	var cookieN = JSON.parse(num);    	
    }    
    function cFailed(m){
    	console.log('未获取到数据！');
    }*/

//1.4 图片轮播部分
function photoScroll() {
	var len = $(".dot > li").length;
    var index = 0;  //图片序号
    var adTimer;
    $(".dot li").mouseover(function() {
        index = $(".dot li").index(this);  //获取鼠标悬浮 li 的index
        showImg(index);
    }).eq(0).mouseover();
    //滑入停止动画，滑出开始动画.
    $('#J_top_banner').hover(function() {
        clearInterval(adTimer);
    }, function() {
        adTimer = setInterval(function() {
            showImg(index)
            index++;
            if (index == len) {       //最后一张图片之后，转到第一张
                index = 0;
            }
        }, 3000);
    }).trigger("mouseleave");

    function showImg(index) {
        //var adWidth = $("#J_top_banner>li:first").width();
        $("#J_top_banner>li").hide()
        						.eq(index).fadeIn('slow')
        						.prev().fadeOut('slow');        						
        $(".dot li").removeClass("current")
            .eq(index).addClass("current");
    }
}

//中间图片轮播
function centerSlide() {

}

//tab效果实现
function tabReal() {
	var $div_li = $(".tab-change li");
			$div_li.click(function() {
				$(this).addClass('active')
			           .siblings()
			           .removeClass('active');	
			    var index = $div_li.index(this);
			    $("div.vertify > div")
			    	.eq(index).show()
			    	.siblings().hide();
			});
}

//分页(上下页)处理
function changePage() {
	var page = 1;
	var i = 1;
	$("span.next").click(function(){
		var $parent = $(this).parents("div.main-courses");
		console.log($parent);
		//var = $parent.find('div.vertify');
		var  $v_show = $parent.find('div.vertify');

		console.log( $v_show);
		var v_width = $v_show.width();
		console.log(v_width);
		//ajax();
		var page_count  = $v_show.find('div').length;
		//var = Math.ceil(len/i);
		//	$v_show.css("overflow":"none");
		if(!$v_show.is(":animated")){

			if(page == page_count){
				$v_show.animate({left: '0px'}, "slow");

				page = 1;
			} else {
				$v_show.animate({ left: '-='+v_width }, "slow");
				page++;
			}
			$('.page-change').find("li").eq((page-1)).addClass('current1')
					.siblings().removeClass('current1');
		}
		return false;
	});

	$("span.prev").click(function(){
		var $parent = $(this).parents("div.main-courses");
		console.log($parent);
		var $v_show = $parent.find('div.vertify');
		var $v_content = $parent.find('ul.design-courses');

		var v_width = $v_content.width();
		//ajax();
		var page_count  = $v_show.find('div').length;
		//var = Math.ceil(len/i);
		//	$v_show.css("overflow":"none");
		if(!$v_show.is(":animated")){

			if(page == 1){
				$v_show.animate({left: '-='+ v_width*(page_count-1)}, "slow");

				page = page_count;
			} else {
				$v_show.animate({ left: '+='+v_width }, "slow");
				page--;
			}
			$('.page-change').find("li").eq((page-1)).addClass('current1')
					.siblings().removeClass('current1');
		}
		return false;
	});
}

//分页跳转
function turnPage() {
	var changeLi = $('.page-change>li');
	changeLi.each(function(i) {
		//var index = $(this).index;
		$changeLi[i].on('click', function() {
			var oCurrentPage = $('.p-detail')[i]; 
			$(this).addClass('curent1')
					.removeClass('current1');
			oCurrentPage.siblings().hide()
						.show();
		});
	});
	
}
//视频浮层播放
function videoPlay() {	
	var $vPlay = $('#J_video_play');
    		$vPlay.on('click', function(){
    			//先登录
		    	$('body').append("<div id='mask'></div>");
		    	$('#mask').addClass('mask')
		    				.fadeIn('slow');
		    	$('#big-video').fadeIn('slow');
		    });	
		$(".close-btn").hover( function () { 
			$(this).css({ color: 'black' }) }, 
			function () { $(this).css({ color: '#999' }) 
		}).on('click', function () {
	    $("#big-video").fadeOut("fast");
	    $("#mask").css({ display: 'none' });
	    return false;
	});
}

//热门课程更换
function coursesChange() {
	var len = $(".hot-courses > li").length;
    var index = 0;  //图片序号
    var adTimer;
    //滑入停止动画，滑出开始动画.
    $('.hot-courses').hover(function() {
        clearInterval(adTimer);
    }, function() {
        adTimer = setInterval(function() {
            showImg(index)
            index++;
            if (index == len) {       //最后一张图片之后，转到第一张
                index = 0;
            }
        }, 5000);
    }).trigger("mouseleave");

    function showImg(index) {
        var adHeight = $(".hot-courses > li:first").height() + 22;
       	var uContent = $('.hot-courses').html();
       //	console.log($('.hot-courses').html());
        $('.hot-courses').html(uContent+uContent);
       // console.log($('.hot-courses').html());
        $(".hot-courses").animate({ "top" :(-adHeight)*index}, 'slow');  
	}
}



















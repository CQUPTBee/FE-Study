$(function (){
	var curIndex = 0;
	var autoChange = setInterval(function(){
		if(curIndex < $(".imgList img").length-1){
	  		curIndex ++;
		}else{
	  		curIndex = 0;
		}
		changeTo(curIndex);
	},5000);

	$(".imgList").find("img").each(function(item){
	$(this).hover(function (){
		clearInterval(autoChange);
		if(curIndex != item){
			changeTo(item);
			curIndex=item;
		}
	},function (){
	    autoChange = setInterval(function(){
	    if(curIndex < $(".imgList img").length-1){
	      curIndex ++;
	    }else{
	      curIndex = 0;
	    }
	    changeTo(curIndex);
	  },5000);
	});
	});


	$(".indexList").find("li").each(function(item){
		$(this).hover(function(){
	  	clearInterval(autoChange);
	  	if(curIndex != item){
	    	changeTo(item);
	    	curIndex=item;
	  	}
		},function(){
	  	autoChange = setInterval(function(){
	    	if(curIndex < $(".imgList img").length-1){
	      		curIndex ++;
	    	}else{
	      		curIndex = 0;
	    	}
	    	changeTo(curIndex);
			},5000);
		});
	});
});

function changeTo(num){
    $(".imgList").find("img").removeClass("imgOn").hide().eq(num).fadeIn(500).addClass("imgOn");
	$(".indexList").find("li").removeClass("indexOn").eq(num).addClass("indexOn");
}


$(function (){
	var $j_mtips = $("#j_mtips");
	var $j_notips = $(".j_notips");
	$j_notips.click(function (){
		Cookies.set('closeTips', 'true', {expires: 7, path: '/'});
		console.log(Cookies.get('closeTips', {path: '/'}));
		$j_mtips.fadeOut(10);
	});

	if(!Cookies.get('closeTips', {path: '/'})){
		$j_mtips.fadeIn(10);
	}

});

$(function (){
	var $foc = $(".nav-focus").find(".foc");
	var $vedio = $(".j_play").find(".imgpic");
	var $mask = $(".mask").find(".closed");
	var $pause = $(".j_video").find("video");
	var videoPause = $pause[0];
	var $nav = $("#nav").find(".lesson");
	var $searchImg =$("#nav").find(".nav-search img");

	$nav.each(function (){
		$(this).hover(function(){
			$nav.removeClass("ahover");
			$(this).addClass("ahover");
			$searchImg.attr("src", "../mission/images/nav-search-bg1.gif");
		},function (){
			$nav.removeClass("ahover");
			$searchImg.attr("src", "../mission/images/nav-search-bg.gif");
		});
	});

	$mask.click(function (){
		$(".mask").fadeOut(10);
		videoPause.load();

	});

	$vedio.click(function (){
		$(".j_video").fadeIn(10);
	});

	$foc.click(function (){
		$(".j_log").fadeIn(10);
	});

});




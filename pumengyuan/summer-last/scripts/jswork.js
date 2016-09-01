$(function (){
	//顶部cookie
	// $(".cookie-right").click(function() {
	// 	console.log(1);
	// 	$("#cookie-bg").hide();
		// $.cookie("tip","off",{expires:365});
	// 	console.log($.cookie('tip'));
	// })
	// if ($.cookie("tip")  == "off") {

	// 	$("#cookie-bg").hide();
	// }
	//登录cookie
	// $(".concern button").click(function() {
	// 	$name = $("#username").val();
	// 	setCookie("username",$name,30);
	// 	setCookie("password",$("#password").val(),30);
	// 	console.log($name);
	// })

	// if(getCookie("username") == "abc" && getCookie("password") == "123") {
	// 	$(".concern").hide();
	// 	$(".nav p").show();
	// }


//concern
	$(".nav input").bind("click", function() {
		$(".concern").show();
	})
	$(".concern span").click(function() {
		$(".concern").hide();
	});



//banner
	$img = $(".banner a");
	$li = $(".banner li");
	var i = 1;
	function move() {
		$img.fadeOut(300);
		$($img[i]).fadeIn(300);
		$li.removeClass("active");
		$($li[i]).addClass("active");
		i++;
		if (i>2) {
			i=0;
		}
	}
	var timer = setInterval(move,3000);
	$img.mouseover(function() {
		clearInterval(timer);
		active();
	});
	$img.mouseout(function() {
		timer = setInterval(move,3000);
	});
	function active() {
		for (var n = 0; n < $li.length; n++) {
			$li[n].index = n;
			$li[n].onclick = function() {
				clearInterval(timer);
				$img.fadeOut(300);
				$($img[this.index]).fadeIn(300);
				$li.removeClass("active");
				$($li[this.index]).addClass("active");
			}
		}
	}



//选项卡
	$("#first").click(function() {
		$(this).css("background-color","#39a030");
		$("#second").css("background-color","#fff");
		$("#design").show();
		$("#programme").hide();
	})
	$("#second").click(function() {
		$(this).css("background-color","#39a030");
		$("#first").css("background-color","#fff");
		$("#programme").show();
		$("#design").hide();
	})



//courses
	ajax("http://study.163.com/webDev/hotcouresByCategory.htm", success, function () { 
		return undefined;
		});
	function success(str) {
		var courses = JSON.parse(str);
		var data = {courses};
		var tp1 = document.getElementById("tp1").innerHTML;
		var result = juicer(tp1,data); //将数据传入此模板
		document.getElementById("programme").innerHTML = result;
		document.getElementById("design").innerHTML = result;
		var tp2 = document.getElementById("tp2").innerHTML;
		var result = juicer(tp2,data); //将数据传入此模板
		document.getElementById("hot-place").innerHTML = result;
	}
//hover 
console.log($(".hot li"));



//video 
	$(".video img").click(function() {
		$(".bg-video").show();
	})
	$(".bg-video span").click(function() {
		$(".bg-video").hide();
	})
//轮播

});
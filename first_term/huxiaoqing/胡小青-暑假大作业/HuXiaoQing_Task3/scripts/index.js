$(function(){
	//cookie
	$(function(){
		var COOKIE_NAME='notice-right';
		$("span.notice-right").click(function(){
			$.cookie(COOKIE_NAME, null, {path:'/',  expires:10});
			$("#notice").hide();
		});
		
	})

	//关注设置
	$(function(){
		//弹出登录表单
		$("input.attention").click(function(){
			if($.cookie('login')){
				alert("has set");
			}else{
				$("#login").show();
			}

		});

		$("span.close").click(function(){
			$("#login").hide();
		});
		
		//表单验证
		$("form:input.required").each(function(){
			var $required = $("<strong class='high'> *</strong");  //创建元素
			$(this).parent().append($required);
		});

		//表单获得焦点
		$("form:input.required").focus(function(){
			var text_value = $(this).val();console.log(text_value);

			$("form:input.required").css("ouline","#39a01f");
			if(text_value == "用户名"||text_value == "密码") {
				$(this).val(" ");
			}
		});

		//表单失去焦点事件
		// $("form:input").blur(function(){
		// 		var text_value = $(this).val();
		// 		var $parent = $(this).parent();

		// 		$("form:input.required").css("ouline","none");

		// 		//删除以前的提醒元素
		// 		$parent.find(".formtips").remove();		
		// 		//验证用户名
		// 		if($(this).is('.username')){
		// 			if(text_value==" "|| text_value.length <6){
		// 				var errorMsg = '请输入至少6位的用户名';
		// 				$parent.append('<span class="formtips onError">'+error Msg+'</span>');
		// 			}else {
		// 				var okMsg = '输入正确';
		// 				$parent.append('<span class="formtips onSuccess">'+ok Msg+'</span>');
		// 			}
		// 		}

		// 		//验证密码
		// 		if($(this).is('.password')){
		// 			if (text_value =="") {
		// 				var errorMsg = '密码不能为空';
		// 				$parent.append('<span class="formtips onError">'+error Msg+'</span>');
		// 			}else if( text_value.length < 6){
		// 				var errorMsg = '请输入至少6位的密码';
		// 				$parent.append('<span class="formtips onError">'+error Msg+'</span>');
		// 			}else{
		// 				var okMsg = '输入正确';
		// 				$parent.append('<span class="formtips onSuccess">'+ok Msg+'</span>');
		// 			}
		// 		}

		// });
		//登录成功
		$("input.sub").click(function(){
			$.get("http://study.163.com /webDev/login.htm",{
				userName: $("input.username").val(),
				password: $("input.password").val()
			},function(data, textStatus){
				alert(data);
			});
		});
	})
	

	//轮播图
	var t=0;
	var n=0;
	var count = 0;

	$(function(){
		count=$("ul.pic li").length; console.log(count);
		$("ul.dot li").click(function() {
			
			var i= $(this).index();

			n=i;
			if(i >= count) return;
			$("ul.pic li").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(500);
			document.getElementById('banner').style.background="";
			$(this).toggleClass("active");
			$(this).siblings().removeAttr("class");
		});
		$.windowbox={
			showAuto:function(){
				n = n >= (count) ? 0:++n;
				$("ul.dot li").eq(n).trigger('click');
			}
		}
		
		t=setInterval("$.windowbox.showAuto()",5000);
		$("#banner").hover(function(){
			clearInterval(t);
		},function(){
			t = setInterval("$.windowbox.showAuto()",5000);
		});

	})

	//tab左右切换
	$(function(){
		// var i=0;
		$("div.tab-title input").click(function(){
			 var i= $(this).index();

			$("div.tab-content div").eq(i).show().siblings().hide();
			$(this).toggleClass("tab-active");
			$(this).siblings().removeAttr("class");
		});
	})


	//点击视频，弹出播放
	$(function(){
		$("div.video").click(function(){
			$("#alert-video").show();

		});
		$("span.close").click(function(){
			$("#alert-video").hide();
		});
	})
	
	//加载图片
	$(function(){
		$.ajax({
			type: "get",
			url: "http://study.163.com/webDev/hotcouresByCategory.htm",
			dataType: "json",
			success: function(data){
				//alert(data);
				var re_data = JSON.parse(data);
				var html='';
				$.each(data,function(i,re_data){
					
					//获取图片
					$("<img class='para'/>").attr('src', re_data.bigPhotoUrl).appendTo("li.lesson-photo");
					if(i==19){
						return  false;
					}
					//获取题目
					$("li.lesson-name").html(re_data.name);
					$("li.categoryName").html(re_data.provider);
					$("li.learner").html(re_data.learnerCount);
					$("li.lesson-price").html(re_data.price);

					//热门排行
					$("<img class='para'/>").attr('src', re_data.smallPhotoUrl).appendTo("li.ranking-photo");
					if(i==9){
						return  false;
					}
					$("li.ranking-name").html(re_data.name);
					$("li.ranking-per").html(re_data.learnerCount);
					
				});
			}
		});
	});
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          


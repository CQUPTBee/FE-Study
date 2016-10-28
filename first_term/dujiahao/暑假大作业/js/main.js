// 模块加载自定义
require.config({
	paths:{
		"jquery":"lib/jquery-3.1.0",
		"juicer":"lib/juicer",
		"nCarsouel":"moudles/bannerCarousel",
		"API":"api/apiConfig",
		"cookie":"api/jquery.cookie",
	}
})

//模块加载
require(['jquery','nCarsouel','API','cookie','juicer'],function($,Carsouel,API,Cookie){


	var contentExdit = {
		init: function(){
			Carsouel();
			this.setScreen();//初始化页面布局
			this.catgories();//初始化页面课程数据 main
			this.course();//tab切换刷新数据
			this.hotRecommend();//热门推荐
			this.page();//分页器
			this.setVideo();//视频播放
			this.attentionLogClose();//导航关注 关闭顶部通知条 登录

		},
		//请求参数
		request: {
				pageNo:"1",//pageNum
				psize:"" ,//dataNum
				type:"10"//catgories
		},
		// 设置屏幕宽度
		setScreen:function(){

			var screen = $(window).width();
			if(screen >= 1205){
				$("link").attr('href', 'css/widescreen.css');
				this.request.psize = 20;
			}
			else{
				$("link").attr('href', 'css/smallscreen.css');
				this.request.psize = 15;
			}
		},
		// 视频播放
		setVideo:function(){
			var video = $("#video1")[0];
			$("#J_video").click(function(event) {
				$("#J_video > video").css("opacity","1");
				if(video.paused){
					video.play();
				}
				else{
					video.pause();
					$("#J_video > video").css("opacity","0");
				}

			});
		},
		// 热门推荐
		hotRecommend:function(){

			API.getHotList.replace(/\"/g, "");//去掉双引号
			var that = this;

			$.get(API.getHotList,function(data) {

				var res = {hotcourse:data};//封装对象
				var html = juicer(that.hotCourse(),res);//编译模板并渲染
				$("#J_list").html(html+html);
				var timerCourse = setInterval(autoCourse,5000);
				function autoCourse (){
					$("#J_list").animate({top: '-=70px'});
					if($("#J_list").css("top")==-1330+'px'){
						$("#J_list").animate({top: '0'},5);
					}

				}


			},'json');
		},
		// 主要课程 tab切换 分页
		course:function(){
			API.getCourseList.replace(/\"/g, "");//去掉双引号
			var that = this;

			$.get(API.getCourseList,that.request,function(data){
				var html = juicer(that.mainCourse(),data);//编译模板并渲染
				$("#J_course > ul").html(html);
			},'json');
		},
		// tab 切换
		catgories:function(){
			var i;
			var $button = $("#J_catgories");
			var button = $button[0].getElementsByTagName('button');
			var that = this;
			for(i = 0; i < 2;i++){

				button[i].index = i;
				$(button).click(function(event) {
					$(button[this.index]).addClass('course-catgories-now')
					.siblings().removeClass('course-catgories-now');
					that.request.type = (this.index+1)*10;
					that.request.pageNo = 1;
					that.course();
				});
			}
		},
		// 分页器  还有部分问题 bug
		page:function(data){
			API.getHotList.replace(/\"/g, "");//去掉双引号
			var that = this;
			var pageN = $('#pages-now')[0].getElementsByTagName('li');
			var init = function(data){
				var i,num;
				for(i = 0 ;i < 8;i++){
					pageN[i].index =i;
					$(pageN[i]).click(function(event) {

						if(this.index >= pageN.length/2){
							num = $(this).html();
							that.request.pageNo = num;
							that.course();
							for(i = 0;i < 8;i++,num++){
								$(pageN[i]).html(num);
							}
							$(pageN[0]).addClass('pages-num-now')
							.siblings().removeClass('pages-num-now');

						}
						else{
							$(this).addClass('pages-num-now')
							.siblings().removeClass('pages-num-now');
							that.request.pageNo = $(this).html();
							that.course();
						}
					});
				}
				$(".pages-star").click(function(event) {

					var posi = $(".pages-num-now").index(),i,num;
					var now = $(".pages-num-now").html();

					if(now >= 8 && posi === 0){
						$(pageN[7]).addClass('pages-num-now')
						.siblings().removeClass('pages-num-now');
						for(i = 0,num = 7;i < 8;i++,num--){
							$(pageN[i]).html(now - num);
						}
						console.log($(pageN[7]).html());
						that.request.pageNo = $(pageN[7]).html();
						console.log($(pageN[7]).html());
						that.course();
					}
					else if(now < 8 && posi === 0){
						console.log(now - 1);
						that.request.pageNo = now - 1;
						that.course();
						for(i = 0;i < 8;i++){
							$(pageN[i]).html( i+1 );
						}
						$(pageN[now - 2]).addClass('pages-num-now')
						.siblings().removeClass('pages-num-now');
					}
					else if(posi !==0 && now !== 1){
						$(pageN[posi-1]).addClass('pages-num-now')
						.siblings().removeClass('pages-num-now');
						console.log($(pageN[posi-1]).html());
						that.request.pageNo = $(pageN[posi-1]).html();
						that.course();
					}
				});
				$(".pages-end").click(function(event) {
					var posi = $(".pages-num-now").index(),i,num,pag;
					var now = $(".pages-num-now").html();

					console.log(posi);
					console.log(now);
					console.log(posi === 7 );
					if(posi == 7 ){
						console.log(now);
						that.request.pageNo = now++;
						that.course();
						$(pageN[0]).addClass('pages-num-now')
						.siblings().removeClass('pages-num-now');
						for(i = 0;i < 8;i++,now++){
							$(pageN[i]).html(now);
						}
					}
					else {
						$(pageN[posi + 1]).addClass('pages-num-now')
						.siblings().removeClass('pages-num-now');
						that.request.pageNo = now + 1;
						that.course();
					}
				});

			};
			init();
		},
		// 导航关注 用户登录 关闭顶部通知条
		attentionLogClose:function(){

			// 关闭顶部通知条
			if(Cookie.get('topNotic', {path: '/'}) !=='true' ){
				$("#J_close").click(function(){
					$("#J_notic").fadeOut();
						console.log("sss");
						Cookie.set('topNotic', 'true', {expires: 7, path: '/'});
				});
			}


			// // 导航关注 登录
			var $logIn = $("#logInBox");
			var $mask  = $("#J_mask");
			var $submit = $("#J_submit");
			var $account = $("#J_account");
			var $password = $("#J_password");
			var request = {
				userName: " ",
				password: " "
			}

			if(Cookie.get('loginSuc',{path: '/'}) !=='true'){
				$logIn.show();
				$mask.show();
				$submit.click(function(){
					request.userName = $account.val();
					request.password = $password.val();
					API.getUserLog.replace(/\"/g, "");
					API.getNaverAttention.replace(/\"/g, "");
					$.get(API.getUserLog,request,function(data){
						console.log(data);
						console.log(request);
						if(data === "1"){
							$logIn.hide();
							$mask.hide();
							Cookie.set('loginSuc', 'true', {expires: 7, path: '/'});

							if(Cookie.get('followSuc',{path: '/'}) !=='true'){
								$("#J_attention").click(function(){
									$.get(API.getNaverAttention,function(data){
										if(data){
											$("#J_attention").html("已关注").attr("disabled","disabled").css("corsour","text");
											Cookie.set('followSuc', 'true', {expires: 7, path: '/'});
										}
									})
								});
							}
							else{
								$("#J_attention").html("已关注").attr("disabled","disabled").css("corsour","text");
							}


						}
						else{
							$("#J_warning").css('opacity',1);
						}
					});
					return false;
				})
			} else {
				if(Cookie.get('followSuc',{path: '/'}) !=='true'){
					$("#J_attention").click(function(){
						$.get(API.getNaverAttention,function(data){
							if(data){
								$("#J_attention").html("已关注").attr("disabled","disabled").css("cursor","text");
								Cookie.set('followSuc', 'true', {expires: 7, path: '/'});
							}
						})
					});
				}
				else{
					$("#J_attention").html("已关注").attr("disabled","disabled").css("cursor","text");
				}

			}

		},
		// 模板 热门推荐
		hotCourse:function(data){
			var tpl = '{@each hotcourse as item}'+
						'<li>'+
							'<a href="#" class="list-icon"><img src="${item.smallPhotoUrl}"></a>'+
							'<h4 class="list-name">${item.name}</h4>'+
							'<p class="list-person">${item.learnerCount}</p>'+
						'</li>'+
						'{@/each}';

			return tpl;
		},
		//模板 main course
		mainCourse:function(data){
			var tpl = 	'{@each list as item}'+
							'<li class="course-fact-list">'+
								'<a href="#"><img src="${item.middlePhotoUrl}" alt="${item.categoryName}"></a>'+
								'<dl class="course-fact-list-definition">'+
									'<dt>${item.name}</dt>'+
									'<dd class="course-fact-list-definition-tag">${item.provider}</dd>'+
									'<dd class="course-fact-list-definition-num"><span>${item.learnerCount}</span></dd>'+
									'<dd class="course-fact-list-definition-value">￥${item.price}</dd>'+
								'</dl>'+
							'</li>'+
						'{@/each}';
			return tpl;
		}
	};

	contentExdit.init();
})

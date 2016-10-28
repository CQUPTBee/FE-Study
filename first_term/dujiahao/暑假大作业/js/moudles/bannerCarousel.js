define(function(){
	var carsouel = function(){
		var iNow = 0;
		var num = $("#J_banner  li").length;
		var $show = $("#J_banner");
		var show = $show[0];
		var showlist = show.getElementsByTagName("li");
		var $btn = $("#J_banner-btn");
		var btn = $btn[0];
		var btnlist = btn.getElementsByTagName("li");
		var timer = setInterval(auto,5000);


		function auto(){
			if(iNow == num-1){
				iNow = 0;
			}
			else{
				iNow++;
			}
			$("#J_banner > li").fadeOut(500);
			$("#J_banner-btn > li").removeClass('clik');
			$(showlist[iNow]).fadeIn(500);
			$(btnlist[iNow]).addClass('clik');
             //click event
			for(i = 0;i < num;i++){
				btnlist[i].index = i;
				$(btnlist).click(function(event) {
					$(this).addClass('clik')
					.siblings('li').removeClass('clik');
					iNow = this.index;
					$(showlist[this.index]).css("display","block")
					.siblings('li').css("display","none");
				});
			}
		}

	};

	return carsouel;
})
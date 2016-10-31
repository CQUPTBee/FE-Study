//使用juicer.js 渲染

//1.获取json数据
var url = "http://study.163.com/webDev/hotcouresByCategory.htm";

ajax(url, fnSucc, fnFiled);

function fnSucc(txt) {
	var json = JSON.parse(txt);
	var	data = { list:json };
	//console.log(json);
		
	//2.编写自定义模板函数,第一个模板
	var tp1 = [
		'{@each list as item}', //list为json数据中的项
			'$${item|list_build1}',
		'{@/each}'
	].join('');
	//3.html的模板函数
	var list1 = function(data) {
		return '<li><img src="'
		+data.middlePhotoUrl+
		'"><h5>'+data.name+
		'</h5><span class="category">'+data.categoryName+
		'</span><span class="design-members">'+data.learnerCount+
		'</span><span class="price">￥'+data.price+
		'</span></li>';
	};
	juicer.register('list_build1', list1);
	var ali1 = juicer(tp1, data);
	//console.log(ali1);
	//第二个模板
	var tp2 = [
		'{@each list as item}', //list为json数据中的项
			'$${item|list_build2}',
		'{@/each}'
	].join('');

	var list2 = function(data) {
		return '<li><img src="'+data.smallPhotoUrl+
				'" alt="课程表"><h5 class="course-name">'
				+data.name+
				'</h5><span class="current-members">'+data.learnerCount+
				'</span></li>';
	};
	juicer.register('list_build2', list2);
	var ali2 = juicer(tp2, data);
	//console.log(ali2);

	var design = document.getElementsByClassName('design-courses')[0];
		console.log(design);
		design.innerHTML = ali1;
	var hotC = document.getElementsByClassName('hot-courses')[0];
		hotC.innerHTML = ali2;
}

function fnFiled(num){
	console.log('failed.');
}

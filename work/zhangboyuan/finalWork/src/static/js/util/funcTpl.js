/**
 * 把注释的函数改变成字符串，这样就可以减少模版编写中的引号
 * 吉鹏
**/

define(function(){
	return function(func){

		
		return func.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '')
	}
});

requirejs.config({
	baseUrl: '../scripts',
	paths: {
		main: 'main'
		jquery: 'lib/jquery-3.1.0.min'
		cookie: 'lib/cookie'
	}
});
define(['main','jquery','cookie'], function(t1) {
	return {
		last-result: function() {
			t1.result();
		}
	}
})
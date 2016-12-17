//导入所需用工具包require（‘node_modules里面的对应模块’）
var gulp=require('gulp');
	sass=require('gulp-sass');
	
//scss任务
	gulp.task('sass',function(){
		return gulp.src('sass/style.scss')
		//获取该任务需要的文件
				.pipe(sass({style:'expanded'}))
		//该任务调用的模块
				.pipe(gulp.dest('sass/css'))

		//将在sass/css文件路径下产生style.css


	});
	//默认任务
	gulp.task('default',['sass','watch1']);
	//监听文件
	gulp.task('watch1',function(){
		return gulp.watch('sass/style.scss',['sass']);
	//监听sass/style.scss文件，修改时自动执行sass任务
	});


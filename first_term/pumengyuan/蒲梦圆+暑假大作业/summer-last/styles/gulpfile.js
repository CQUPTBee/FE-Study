//导入所需要的工具包require（'node_modules'里对应模块）
var gulp = require('gulp'),
    sass = require('gulp-sass');
gulp.task('sass', function () {
    return gulp.src('sass/**/*.scss') //获取该任务需要文件
        .pipe(sass())                //该任务调用的模块
        .pipe(gulp.dest('css'));     //将在css文件夹中产生top.css
});
 
//默认任务
gulp.task('default', ['sass', 'watch1']);

//监听文件
gulp.task('watch1', function () {
	return gulp.watch('sass/**/*.scss', ['sass']);
});
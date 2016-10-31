var gulp = require('gulp');
	sass = require('gulp-sass');

	gulp.task('sass', function(){
		return gulp.src('./styles/sass/main.scss')
			.pipe(sass({style: 'expanded'}))
			.pipe(gulp.dest('./styles/css'))
	});

	gulp.task('default', ['sass','watch1']);
	gulp.task('watch1', function(){
		return gulp.watch('styles/sass/main.scss', ['sass']);
	});
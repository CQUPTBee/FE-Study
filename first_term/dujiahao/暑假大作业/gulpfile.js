//使用方法:命令行,执行 gulp，就可以完成sass文件监听并编译
var gulp = require('gulp'),
    fs   = require('fs'),
    sass = require('gulp-sass'),
//rev  = require('gulp-rev'),//自动版本号
//revCollector = require('gulp-rev-collector'),//自动版本号
    livereload = require('gulp-livereload');
    sprite = require('gulp.spritesmith');
    autoprefixer = require('gulp-autoprefixer');//自动添加前缀
    notify = require('gulp-notify');
    stripCssComments = require('gulp-strip-css-comments');
//1.编译sass
gulp.task('sass',function(){
    console.log("sass work");
    //**可以匹配所有目录下的所有文件
    gulp.src('sass/*.scss')
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6',  'android 4'))
        .pipe(sass({
            includePaths:['sass']
        }))//坑，gulp－sass必须在参数里指明，@import的路径 .已修复，includePaths参数可以添加impotr路径
        .pipe(stripCssComments())
        .pipe(gulp.dest('css'))
        .pipe(notify({ message: 'Styles task complete' }));
});
gulp.task('watch', function(event) {
    gulp.watch('sass/*.scss', ['sass']);
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
// JS hint task
//gulp.task('styles', function() {
 // gulp.src(['sass/*.scss'])
   // .pipe(autoprefix('last 2 versions'))
    //.pipe(gulp.dest('sass/*.scss'));
//});



//3.gulp 实时浏览器刷新
gulp.task('live', function () {
    livereload.listen();
    //var server = livereload(9000);

    // gulp.watch('static/**/**', function (file) {
    //     console.log("live watch");
    //     server.changed(file.path);
    // });
        gulp.watch('**/*.*').on('change', function(e){
            tpl = function()
            {/*阿杜好帅~~~~~*/}

            console.log(tpl.toString().slice(18,-3));
        /// and when they do change, notify the server with a path of a changed file
        livereload.changed(e.path);
    });
});

//4.自动打版本号version，测试jekins是否生效
/*gulp.task("vers",function(){
 gulp.src("static/css/global.css")
 .pipe(rev())
 //.pipe(rev.manifest())
 .pipe(gulp.dest("static/css/lib"));
 });*/
gulp.task("vers",function(){
    var time = new Date();
    var day  = time.getDate();
    var hours = time.getHours();
    fs.rename(__dirname + '/css/global.css', __dirname + '/css/global.css?v='+day+"日"+hours+"时", function (err) {
        if(err) {
            console.error(err);
            return;
        }
        console.log('重命名成功')
    });
});
gulp.task('default',['watch','live'],function(){
    console.log("执行 default");//
});

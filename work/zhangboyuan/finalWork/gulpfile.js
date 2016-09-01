var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var spritesmith = require('gulp.spritesmith');
var cache = require('gulp-cache');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var livereload = require('gulp-livereload');
// 样式文件处理（包括：编译 sass，合并 css，重命名，压缩，添加浏览器前缀，制作 sourcemaps，迁移到发布环境）
// ===============================================================================================
// 编译 scss 文件
gulp.task('sass', function(cb) { // 传入一个回调函数，因此引擎可以知道何时它会被完成
    // return a value as the completion hint
    return gulp.src('src/static/sass/**/*.scss')
        .pipe(plumber())
        // .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gulp.dest('src/static/css'))
        // .pipe(concat('zz-all-sass.css'))
        // .pipe(gulp.dest('src/css/sass/tmp'))
        // .pipe(rename('all.min.css'))
        // .pipe(cleanCss())
        // .pipe(autoprefixer({
        //     browsers: ['> 1%', 'not ie <= 8']
        // }))
        // // .pipe(sourcemaps.write())
        // .pipe(gulp.dest('src/static/css'));
    console.log('sass 文件处理完毕！');
    cb(err); // 如果 err 不是 null 和 undefined，流程会被结束掉，'two' 不会被执行
});
gulp.task('css', ['sass'], function(cb) { // 标注一个依赖，依赖的任务必须在这个任务开始之前被完成
    // return gulp.src('src/static/css/*.css')
    //     .pipe(concat('all.min.css'))
    //     .pipe(cleanCss())
    //     .pipe(gulp.dest('dist/css'));
    // console.log('css 文件处理完毕！');
    // cb(err);
});
//3.gulp 实时浏览器刷新
gulp.task('live', function() {
    livereload.listen();
    //var server = livereload(9000);

    // gulp.watch('static/**/**', function (file) {
    //     console.log("live watch");
    //     server.changed(file.path);
    // });
    gulp.watch('static/**/*.*').on('change', function(e) {
        /// and when they do change, notify the server with a path of a changed file
        livereload.changed(e.path);
    });
});
// 执行所有样式相关任务，并且开启监视
gulp.task('css-watch', ['sass'], function() {
    console.log('正在监视 scss 及 css 文件变动');
    // 监听 sass
    var watcher = gulp.watch('src/static/sass/**/*.scss', ['css']); // 监视那些文件的变动，以及变动之后执行的任务
    watcher.on('change', function(event) {
        // 在 CLI 中输出一些提示信息，帮助我们了解程序发生了什么
        // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        console.log('事件路径： ' + event.path + ' 事件类型： ' + event.type + ', 正在执行的任务：css tasks');
    });
});
// JS任务处理【使用了requireJS就不能用此功能了】
// ===============================================================================================
// JS压缩
gulp.task('js-optimize', function(cb) {
    return gulp.src('src/static/js/**/*.js')
        // .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js/tmp'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
    console.log('js 文件优化处理完毕！');
    cb(err);
});
gulp.task('js', ['js-optimize'], function(cb) {
    gulp.src('src/js/others/*.js')
        .pipe(gulp.dest('dist/js/others'));
    console.log('js 文件移动处理完毕！');
    // cb(err);
});
// gulp.task('js', ['js-optimize', 'js-move']);
// 执行所有 js 相关任务，并且开启监视
gulp.task('js-watch', ['js'], function() {
    console.log('正在监视 js 文件变动');
    // 监听 js
    var watcher = gulp.watch('src/js/**/*.js', ['js']); // 监视那些文件的变动，以及变动之后执行的任务
    watcher.on('change', function(event) {
        // 在 CLI 中输出一些提示信息，帮助我们了解程序发生了什么
        // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        console.log('事件路径： ' + event.path + ' 事件类型： ' + event.type + ', 正在执行的任务：style');
    });
});
// 执行所有 js 及 样式 相关任务，并且开启监视
gulp.task('jc', function() {
    console.log('正在监视 js 及 样式 文件变动');
    // 监听 js
    var watcher = gulp.watch('src/@(js|css)/**/*.@(js|scss)', ['js', 'css']); // 监视那些文件的变动，以及变动之后执行的任务
    watcher.on('change', function(event) {
        // 在 CLI 中输出一些提示信息，帮助我们了解程序发生了什么
        // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        console.log('事件路径： ' + event.path + ' 事件类型： ' + event.type + ', 正在执行的任务：js 及 样式');
    });
});
// 图片处理
// ===============================================================================================
// 图片压缩
gulp.task('img', function() {
    return gulp.src(['src/static/img/**/*.{png,jpg,gif}'])
        .pipe(plumber())
        .pipe(cache(imagemin({ // 只压缩修改的图片，没有修改的图片直接从缓存文件读取
            progressive: true,
            use: [pngquant()] // 使用 pngquant 深度压缩 png 图片
        })))
        .pipe(gulp.dest('dist/img'));
    console.log('图片压缩完毕！');
});
// 合成 sprite 图（只是单一的一个功能，貌似比较难与其他功能串联配合）
gulp.task('sprite', function() {
    return gulp.src('src/img/tmp/!(sprite.png|*.css)')
        .pipe(spritesmith({
            imgName: 'ico.png',
            cssName: 'sprite.css'
        }))
        .pipe(gulp.dest('src/img'));
    console.log('sprite 图合成完毕！');
});



// 实时重载 Domain server
// gulp.task('serve', function() {
//     browserSync({
//         // 注意：请勿同时设置 proxy 和 server,否则会报错
//         proxy: "dev01.com.dev",
//         // port: 3000,
//         // browser: ["google chrome", "firefox"],      //默认值为"google chrome"
//         reloadOnRestart: false
//     });
//
//     gulp.watch(['*.html', 'dist/css/**/*.css', 'dist/js/**/*js','dist/images/**/*.*', 'views/**/*.php']).on("change", reload);
// });
// Domain server
gulp.task('serve', function() {
    browserSync.init({
        proxy: "deva.dev",
        port: 3001,
        open: "ui",
        ui: { port: 3005 }
    });
});
// gulp.task('serve',function() {
//     browserSync({
//         server: {
//             // host:'localhost:80',
//             baseDir: ''
//         },
//         startPath: 'index.php?homepage&a=login'
//     });
//
//     gulp.watch(['*.html','css/**/*.css','js/**/*js','images/**/*.*','views/**/*.php'], {cwd: './'}, reload);
// });
// 定义默认任务,执行`gulp`会自动执行（个人认为可以把需要频繁执行的任务放在这里，例如：css、js；而图片压缩之类的就不必了）
// gulp.task('default', function() {
//
//     // 监听 sass
//     var watcher = gulp.watch('src/css/sass/**/*.scss', ['sass']);
//     watcher.on('change', function(event) {
//
//         // 在 CLI 中输出一些提示信息，帮助我们了解程序发生了什么
//         // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//         console.log('事件路径： ' + event.path + ' 事件类型： ' + event.type + ', 正在执行的任务：style');
//     });
// });




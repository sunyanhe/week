//引入插件
var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var server = require('gulp-webserver');
var autoprefixer = require('gulp-autoprefixer')

//引入模块
var path = require('path');
var url = require('url');
var fs = require('fs')
    //压缩css
gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('src/scss'))
});

//压缩js文件
gulp.task('uglify', function() {
    gulp.src(['src/**/*.js', '!src/**/*.min.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

//启动服务

var opt = [{
        id: 1,
        name: 'zs',
        age: 12
    },
    {
        id: 2,
        name: 'ls',
        age: 15
    }
]
gulp.task('server', ['sass', "uglify"], function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            open: true,
            fallback: 'index.html',
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify(opt))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})
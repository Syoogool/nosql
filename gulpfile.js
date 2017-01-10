//  引入gulp及组件
var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	html = require('gulp-minify-html');


//  设置输入输出文件夹位置
var srcCss = 'css/*.css',
	distCss = 'dist/css',
	srcJs = 'js/*.js',
	distJs = 'dist/js',
	srcImg = 'images/*.*',
	distImg = 'dist/images',
	srcSass = 'sass/*.scss',
	distSass = 'dist/sass',
	srcConcatCss = 'dist/css/.css',
	distConcatCss = 'dist/concat/css/';


// 压缩css
gulp.task('css', function() {
	gulp.src(srcCss)
		.pipe(minifyCSS())
		.pipe(gulp.dest(distCss));
}); 

// 压缩js
gulp.task('js', function() {
	gulp.src(srcJs)
			.pipe(uglify())
			.pipe(gulp.dest(distJs));
});

// 压缩图片
gulp.task('images', function() {
	gulp.src(srcImg)
		.pipe(imagemin())
		.pipe(gulp.dest(distImg));
});

// sass转css
gulp.task('sass', function() {
	return gulp.src(srcSass)
			   .pipe(sass()).on('error', sass.logError)
			   .pipe(gulp.dest(distSass))
});

// 合并css文件
gulp.task('concatCss', function() {
	gulp.src(srcConcatCss)
		.pipe(concat('all.css'))
		.pipe(gulp.dest(distConcatCss));
});

// js代码检查
gulp.task('jshint', function() {
	gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter());
});

// 压缩html
gulp.task('html', function() {
	gulp.src('*.html')
		.pipe(html())
		.pipe(gulp.dest('dist/minhtml'))
		
})
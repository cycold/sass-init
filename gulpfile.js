/**
* Created by cycold on 2016-09-09
*/

const gulp = require('gulp')

// 自动将gulp插件统一挂载到单个对象中 https://www.npmjs.com/package/gulp-load-plugins
const $ = require('gulp-load-plugins')()

// autoprefix https://github.com/postcss/autoprefixer
const autoprefixerOptions = {
  browsers: ['last 2 versions', 'Android >= 4.0'],
  cascade: true, //是否美化属性值 默认：true 像这样：
                 //-webkit-transform: rotate(45deg);
                 //        transform: rotate(45deg);
  remove:true    //是否去掉不必要的前缀 默认：true
}

// sourcemaps https://github.com/floridoo/gulp-sourcemaps
const srcMapsOptions = {
  includeContent: true,
  //sourceMappingURLPrefix:''
}
// sass https://www.npmjs.com/package/gulp-sass/
const sassOptions = { outputStyle: 'compressed' }

function buildSass() {
  return gulp.src(["./sass/*.scss"])
    .pipe($.sourcemaps.init())

    .pipe($.sass(sassOptions).on('error', $.sass.logError))

    .pipe($.autoprefixer(autoprefixerOptions))

    .pipe($.sourcemaps.write('./maps', srcMapsOptions))

    .pipe(gulp.dest("./style"))
}

// 注册任务buildSass
gulp.task('build', function() {
  return buildSass()
})

gulp.task('watch', [] , function() {
  // 文件变化执行回调函数
  gulp.watch(['./sass/**/*.scss'], function(event) {
    gulp.start('build')
  })
})

gulp.task('default', function() {
  gulp.start('watch')
})

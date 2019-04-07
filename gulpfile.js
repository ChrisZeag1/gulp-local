const gulp = require('gulp');
const sass = require('gulp-sass');
const serve = require('browser-sync').create();
const babel =  require('gulp-babel');
const concat =  require('gulp-concat');

sass.compiler = require('node-sass');
 
gulp.task('sass',  () => {
  console.log('runnig sasss> ');
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('js',  () => {
  // Compiling to ES5 to  support to IE10+
  console.log('runnig js> ');
  return gulp.src('./app/js/**/*.js')
    .pipe(babel({ "presets": ['@babel/preset-env'] }))
     .pipe(concat('./index.js'))
    .pipe(gulp.dest('./app'));
});


gulp.task('reload', (done) => {
  console.log('runing realod >> ');
  serve.reload();
  done();
});

gulp.task('serve', (done) => {
  console.log('runing serve >> ');
  serve.init({
    server: {
      baseDir: './app'
    },
  });
  done();
});

gulp.task('watch:sass', () => {
  console.log('runnig sass watch...');
  gulp.watch('./app/scss/**/*.scss', gulp.series('sass', 'reload'));
});

gulp.task('watch:html', () => {
  console.log('runnig html watch...');
  gulp.watch('./app/index.html', gulp.series('reload'));
});

gulp.task('watch:js', () => {
  console.log('runnig js watch...');
  gulp.watch('./app/js/**/*.js', gulp.series('js', 'reload'));
});

gulp.task('default', gulp.parallel('sass', 'js', 'serve', 'watch:sass', 'watch:html', 'watch:js'));

//TODO:  add task to build for prod:  minification and tree shaking

gulp.task('default')();

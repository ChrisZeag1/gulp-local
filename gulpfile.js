const gulp = require('gulp');
const sass = require('gulp-sass');
const serve = require('browser-sync').create();

sass.compiler = require('node-sass');
 
gulp.task('sass',  () => {
  console.log('runnig sasss> ');
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
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

gulp.task('default', gulp.parallel('sass','serve', 'watch:sass', 'watch:html'));

//TODO:  add task to build for prod:  minification and tree shaking

gulp.task('default')();

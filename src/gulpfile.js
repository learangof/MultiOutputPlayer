var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require("gulp-typescript");
var refresh = require('gulp-refresh');
var del = require('del');       
var notify = require('gulp-notify');


sass.compiler = require('node-sass');

const root_input = './static_/';
const root_output = './static/';

/* Development */
gulp.task('sass', function () {
  return gulp.src(root_input + 'sass/base.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(root_output))
    .pipe(refresh());
});

var tsProject = ts.createProject('tsconfig.json');
gulp.task('ts', function () {
    return gulp.src([root_input + 'ts/**/*.ts',root_input + 'ts/**/*.js'])
        .pipe(tsProject())
        .pipe(gulp.dest(root_output))
        .pipe(refresh());
});
/* Production */
gulp.task('clean_prod', function() {
  return del([
    './dist/**',
    '!dist/package.json'
    // 'dist/report.csv',
    // here we use a globbing pattern to match everything inside the `mobile` folder
    // 'dist/mobile/**/*',
    // // we don't want to clean this file though so we negate the pattern
    // '!dist/mobile/deploy.json'
  ]);
});
gulp.task('html_prod', function() {
  return gulp.src('./views/**/*.html')
      .pipe(gulp.dest("./dist/views/"))
      .pipe(notify({message:'Copy <%= file.relative %>'}));
});
gulp.task('static_prod', function() {
  return gulp.src('./static/**')
      .pipe(gulp.dest("./dist/static/"))
      .pipe(notify({message:'Copy <%= file.relative %>'}));
});
gulp.task('assests_prod', function() {
  return gulp.src('./assests/**')
      .pipe(gulp.dest("./dist/assests/"))
      .pipe(notify({message:'Copy <%= file.relative %>'}));
});
/* WATCH */
gulp.task('watch', function () {
    refresh.listen();
    gulp.watch(root_input + "sass/**/*.scss", gulp.parallel(['sass']));
    gulp.watch(root_input + "sass/**/*.sass", gulp.parallel(['sass']));
    gulp.watch(root_input + "ts/**/*.ts", gulp.parallel(['ts']));
    gulp.watch(root_input + "ts/**/*.js", gulp.parallel(['ts']));
    gulp.watch("./views/**/*.html").on("change", refresh.reload);
    gulp.watch("./assests/**").on("change", refresh.reload);
  });

/* Main Functions */
gulp.task('default', gulp.parallel(['sass', 'ts', 'watch']));
gulp.task('prod', gulp.series(['clean_prod','html_prod','static_prod','assests_prod']));



// gulp.task('ts', function () {
//     return gulp.src(root_input + 'ts/**/*.ts')
//         .pipe(ts({
//             noImplicitAny: false,
//             esModuleInterop: true,
//             allowJs: true,
//             target: "es5",
//             exclude: ["node_modules", "build", "dist", "ts/**/*.js", "ts/**/*.jsx"]
//         }))
//         .pipe(gulp.dest(root_output))
//         .pipe(refresh());
// });
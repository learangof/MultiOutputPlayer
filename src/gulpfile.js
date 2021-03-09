var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require("gulp-typescript");
var refresh = require('gulp-refresh')
 
sass.compiler = require('node-sass');

const root_input = './static_/';
const root_output = './static/';
 
gulp.task('sass', function () {
  return gulp.src(root_input + 'sass/base.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(root_output))
    .pipe(refresh());
});
var tsProject = ts.createProject('tsconfig.json');
gulp.task('ts', function () {
    return gulp.src([root_input + 'ts/**/*.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest(root_output));
});
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

gulp.task('watch', function () {
    refresh.listen();
    gulp.watch(root_input + "sass/**/*.scss", gulp.parallel(['sass']));
    gulp.watch(root_input + "sass/**/*.sass", gulp.parallel(['sass']));
    gulp.watch(root_input + "ts/**/*.ts", gulp.parallel(['ts']));
    gulp.watch("./views/**/*.html").on("change", refresh.reload);
    gulp.watch("./assests/**").on("change", refresh.reload);
  });

gulp.task('default', gulp.parallel(['sass', 'ts', 'watch', ]));
gulp.task('prod', gulp.parallel(['sass', 'ts']));
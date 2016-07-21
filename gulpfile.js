var gulp = require('gulp'),
    jade = require('gulp-jade'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    clean = require('gulp-clean');

var path = {
    src: './src',
    dist: './dist'
};

gulp.task('build:jade', function() {
    gulp.src(path.src + '/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(path.dist))
});

gulp.task('build:scss', function() {

    gulp.src(path.src + '/scss/main.scss')
        .pipe(scss().on('error', scss.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(path.dist + '/css'));
});

gulp.task('build:js', function() {

    gulp.src(path.src + '/js/**/*')
        .pipe(gulp.dest(path.dist + '/js'));
});

gulp.task('build:img', function() {

    gulp.src(path.src + '/img/**/*')
        .pipe(gulp.dest(path.dist + '/img'));
});

gulp.task('clean', function () {
    return gulp.src(path.dist, {read: false})
        .pipe(clean())
});


gulp.task('dist:serve', function() {
    return browserSync.init({
        server: {
            baseDir: path.dist,
            routes: {
                '/dist': '/',
                '/bower_components': 'bower_components'
            }
        }
    });
});

gulp.task('watch:jade', function() {
    gulp.watch(path.src + '/jade/**/*', ['build:jade', browserSync.reload]);
});

gulp.task('watch:scss', function() {
    gulp.watch(path.src + '/scss/**/*', ['build:scss']);
});

gulp.task('watch:js', function() {
    gulp.watch(path.src + '/js/**/*', ['build:js', browserSync.reload]);
});

gulp.task('watch:img', function() {
    gulp.watch(path.src + '/img/**/*', ['build:img', browserSync.reload]);
});

gulp.task('dist:build', ['build:jade', 'build:scss', 'build:js', 'build:img']);

gulp.task('dist:watch', ['watch:jade', 'watch:scss', 'watch:js', 'watch:img']);

gulp.task('default', ['dist:build', 'dist:serve', 'dist:watch']);
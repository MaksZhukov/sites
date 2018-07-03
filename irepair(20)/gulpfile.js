let gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssImport = require('gulp-cssimport'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-tinypng-nokey'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber');

// Пользовательские скрипты проекта

gulp.task('common-js', function () {
    return gulp.src([
        'app/js/common.js',
    ])
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/slick-carousel/slick/slick.min.js',
        'app/libs/yandexmap/yandexapi.min.js',
        'app/js/common.min.js'
    ])
        .pipe(concat('scripts.min.js'))
        // .pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        // tunnel: true,
        // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
});
gulp.task('pug', function () {
    return gulp.src('app/pug/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('sass-dev', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer(['last 5 versions']))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass-prod', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(cssImport())
        .pipe(autoprefixer(['last 5 versions']))
        //.pipe(cleanCSS()) // Опционально, закомментировать при отладке
        .pipe(gulp.dest('app/css/'))
});

gulp.task('sass-prod-min', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
        .pipe(cssImport())
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer(['last 5 versions']))
        .pipe(gulp.dest('app/css/'))
});

gulp.task('watch', ['pug', 'sass-dev', 'js', 'browser-sync'], function () {
    gulp.watch('app/sass/**/*.sass', function (event, cb) {
        setTimeout(function () {
            gulp.start('sass-dev');
        }, 100)
    });
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
    gulp.watch('app/pug/**/*.pug', ['pug']);
});

gulp.task('imagemin', function () {
    return gulp.src('app/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('prod', ['removedist', 'imagemin', 'sass-prod', 'sass-prod-min', 'js'], function () {
//Move htaccess
    /*  gulp.src([
            'app/.htaccess',
        ]).pipe(gulp.dest('dist'));*/
// Move html
    gulp.src([
        'app/*.html',
    ]).pipe(gulp.dest('dist/'));
// Move css
    gulp.src([
        'app/css/*',
    ]).pipe(gulp.dest('dist/css'));
// Move all min js
    gulp.src([
        'app/js/scripts.min.js',
        'app/js/common.js'
    ]).pipe(gulp.dest('dist/js'));
// Move fonts
    gulp.src([
        'app/fonts/**/*',
    ]).pipe(gulp.dest('dist/fonts'));
// Move libs
    gulp.src([
        'app/libs/**/*',
    ]).pipe(gulp.dest('dist/libs'));
// Move php
    //gulp.src([     //Разблокировать если есть php файлы
    //    'app/**/*.php',
    //]).pipe(gulp.dest('dist'));
});

gulp.task('removedist', function () {
    return del.sync('dist');
});

gulp.task('dev', ['watch']);
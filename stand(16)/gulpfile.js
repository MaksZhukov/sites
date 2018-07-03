var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    minHtml = require("gulp-html-minify"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    unCss = require('gulp-uncss'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-tinypng-nokey'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    ftp = require('vinyl-ftp'),
    notify = require("gulp-notify"),
    rsync = require('gulp-rsync');

// Пользовательские скрипты проекта

gulp.task('common-js', function() {
    return gulp.src([
            'app/js/common.js',
        ])
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function() {
    return gulp.src([
            'app/libs/jquery/dist/jquery.min.js',
            'app/libs/jquery.maskedinput/dist/jquery.maskedinput.min.js',
            'app/libs/slick-carousel/slick/slick.min.js',
            'app/js/common.min.js', // Всегда в конце
        ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        //tunnel: "stand" //Demonstration page: http://projectmane.localtunnel.me
    });
});
gulp.task('pug', function() {
    return gulp.src('app/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS()) // Опционально, закомментировать при отладке
        /* .pipe(unCss({
             html: ['app/*.html'],
             ignore: [
                 /\.affix/,
                 /\.alert/,
                 /\.close/,
                 /\.collaps/,
                 /\.fade/,
                 /\.has/,
                 /\.help/,
                 /\.in/,
                 /\.modal/,
                 /\.open/,
                 /\.popover/,
                 /\.tooltip/,
                 /\.animate/,
                 /\.bx-wrapper/,
                 /\.carousel/,
                 /\.slick-slider/,
                 /\.slick-prev/,
                 /\.slick-next/,
                 /\.slick-list/,
                 /\.slick-track/,
                 /\.slick-slide/
             ]
         }))
         */
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', ['pug', 'sass', 'js', 'browser-sync'], function() {
    gulp.watch('app/sass/**/*.sass', function(event, cb) {
        setTimeout(function() { gulp.start('sass'); }, 100)
    });
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
    gulp.watch('app/pug/**/*.pug', ['pug']);
});

gulp.task('htmlmin', function() {
    return gulp.src('app/*.html')
        //.pipe(minHtml())
        .pipe(gulp.dest('dist/'));
});

gulp.task('imagemin', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin())) // Cache Images
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'htmlmin', 'sass', 'js'], function() {

    var buildFiles = gulp.src([
        'app/.htaccess',
    ]).pipe(gulp.dest('dist'));

    var buildCss = gulp.src([
        'app/css/main.min.css',
    ]).pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src([
        'app/js/scripts.min.js',
    ]).pipe(gulp.dest('dist/js'));

    var buildFonts = gulp.src([
        'app/fonts/**/*',
    ]).pipe(gulp.dest('dist/fonts'));

    var buildPhp = gulp.src([     //Разблокировать если есть php файлы
        'app/**/*.php',
    ]).pipe(gulp.dest('dist'));

});

gulp.task('deploy', function() {

    var conn = ftp.create({
        host: 'hostname.com',
        user: 'username',
        password: 'userpassword',
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        'dist/**',
        'dist/.htaccess',
    ];
    return gulp.src(globs, { buffer: false })
        .pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('rsync', function() {
    return gulp.src('dist/**')
        .pipe(rsync({
            root: 'dist/',
            hostname: 'username@yousite.com',
            destination: 'yousite/public_html/',
            // include: ['*.htaccess'], // Скрытые файлы, которые необходимо включить в деплой
            recursive: true,
            archive: true,
            silent: false,
            compress: true
        }));
});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function() { return cache.clearAll(); });

gulp.task('default', ['watch']);
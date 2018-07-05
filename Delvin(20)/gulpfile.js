var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    emitty = require('emitty').setup('app/pug', 'pug', {
        makeVinylFile: true
    }),
    minHtml = require("gulp-html-minify"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    cleanCSS = require('gulp-clean-css'),
    unCss = require('gulp-uncss'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-tinypng-nokey'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    rsync = require('gulp-rsync');

// Пользовательские скрипты проекта

gulp.task('common-js', function () {
    return gulp.src([
        'app/js/common.js',
    ])
        .pipe(concat('common.min.js'))
        .pipe(uglify().on("error", notify.onError(function (error) {
            return error;
        })))
        .pipe(gulp.dest('app/js'));
});

gulp.task('js', gulp.series('common-js', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/yandexmap/yandexapi.js',
        'app/libs/jquery.maskedinput/src/jquery.maskedinput.js',
        'app/js/common.min.js' // Всегда в конце
    ])
        .pipe(concat('scripts.min.js'))
        // .pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}));
}));

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
    return gulp.src('app/pug/*.pug',{read: false})
        .pipe(gulpif(global.watch, emitty.stream(global.emittyChangedFile,global.emittyChangedFileStatus)))
        .pipe(pug({pretty: true}))
        .on("error", notify.onError(function (error) {
            return error;
        }))
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError(function (error) {
            return error;
        })))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer(['last 15 versions']))
        /* .pipe(cleanCSS()) // Опционально, закомментировать при отладке
        .pipe(unCss({
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
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', gulp.parallel('pug', 'sass', 'js', 'browser-sync', function () {
    global.watch = true;
    gulp.watch('app/sass/**/*.sass', gulp.series('sass'));
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.series('js'));
    gulp.watch('app/pug/**/*.pug', gulp.series('pug')).on('all', function (event, filepath, status) {
        global.emittyChangedFile = filepath;
        global.emittyChangedFileStatus = status;
    });
}));

gulp.task('htmlmin', function () {
    return gulp.src('app/*.html')
        .pipe(minHtml())
        .pipe(gulp.dest('dist/'));
});

gulp.task('imagemin', function () {
    return gulp.src('app/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('removedist', function(done) {
    del.sync('dist');
    done();
});

gulp.task('build', gulp.parallel('removedist'/*, 'imagemin'*/, 'htmlmin', 'sass', 'js', function (done) {

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

//var buildPhp = gulp.src([ //Разблокировать если есть php файлы
// 'app/**/*.php',
//]).pipe(gulp.dest('dist'));

    done();

}));

gulp.task('rsync', function () {
    return gulp.src('app/**')
        .pipe(rsync({
            root: 'app/',
            hostname: 'files.000webhost.com',
            destination: 'fasttestersite/public_html/',
// include: ['*.htaccess'], // Includes files to deploy
            exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
            recursive: true,
            archive: true,
            silent: false,
            compress: true
        }));
});

gulp.task('default', gulp.series('watch'));
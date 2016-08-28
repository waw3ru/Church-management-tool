
/*
* todo: Change the google fonts options when internet returns
* */

"use strict";

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    flatten = require('gulp-flatten'),
    sass = require('gulp-sass'),
    del = require('del'),
    shell = require('gulp-shell'),
    sequence = require('gulp-sequence'),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    path = require("path"),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCss = require('gulp-clean-css');



var configs = {
    js: {
        scripts: "./src/",
        modules: "./src/modules/",
        build: "./public/js/"
    },
    css: {
        scss: "./src/scss/",
        build: "./public/css/"
    },
    assets: {
        vendor: "./src/assets/libs/",
        modules_html: "./src/modules/",
        images: "./src/assets/images/"
    }
};


gulp.task("build:scripts", function () {

    gulp
        .src([
            configs.js.scripts + "*.js"
        ])
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(configs.js.build));

});

gulp.task("build:modules", function () {

    gulp
        .src([
            configs.js.modules + "**/*.js"
        ])
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('module.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(configs.js.build));

});

gulp.task("watch:scripts", function () {

    gulp.watch("./src/modules/**/*.js",[ "build:modules" ]);
    gulp.watch("./src/*.js",[ 'build:scripts' ]);

});


gulp.task("build:sass", function () {

    gulp
        .src([
            configs.css.scss + "main.scss"
        ])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded', sourceMap: true }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename('app.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(configs.css.build));

});

gulp.task("watch:sass",function () {

    gulp.watch(configs.css.scss + "*.scss", [ 'build:sass' ]);
    gulp.watch(configs.css.scss + "**/*.scss", [ 'build:sass' ]);

});

gulp.task("build:prod:sass", function () {

    gulp
        .src([
            configs.css.scss + "main.scss"
        ])
        .pipe(sass({ outputStyle: 'compressed', sourceMap: false }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest(configs.css.build));

});

gulp.task("build:assets:vendor", function () {

    gulp.src([
            configs.assets.vendor + "**/*min.js"
        ])
        .pipe(flatten())
        .pipe(gulp.dest("./public/vendor/js/"));

    gulp.src([
            configs.assets.vendor + "**/*.min.css"
        ])
        .pipe(flatten())
        .pipe(gulp.dest("./public/vendor/css/"));

    gulp.src([
            configs.assets.vendor + "font-awesome/**",
            "!" + configs.assets.vendor + "font-awesome/*.json"
        ])
        .pipe(gulp.dest("./public/vendor/font-awesome/"));

    gulp.src([
            configs.assets.vendor + "ionicons/**",
            "!" + configs.assets.vendor + "ionicons/*.json"
        ])
        .pipe(gulp.dest("./public/vendor/ionicons/"));

});

gulp.task("build:assets:html", function () {

    gulp.src([
            configs.assets.modules_html + "**/*.html"
        ])
        .pipe(flatten())
        .pipe(gulp.dest("./public/templates/"));


    gulp.src([
            "./src/index.html"
        ])
        .pipe(flatten())
        .pipe(gulp.dest("./public/"));

});


gulp.task("build:assets:images", function () {

    gulp.src([
            configs.assets.images + "*.{png,jpg,jpeg,gif,svg,ico}"
        ])
        .pipe(flatten())
        .pipe(gulp.dest("./public/images/"));

});

gulp.task("watch:assets", function () {

    gulp.watch("./src/modules/**/*.html", [ 'build:assets:html' ]);    
    gulp.watch("./src/index.html", [ 'build:assets:html' ]);

    browserSync.reload();

});

// clean build
gulp.task("clean:app", function () {
    del([ "./public/index.html", "./public/js/*.js", "./public/css/*.css", "!./public" ], function () { });
});
gulp.task("clean:vendor", function () {
    del([ "./public/vendor/**", "!./public" ], function () { });
});
gulp.task("clean:all", function () {
    del([ "./public/**", "!./public" ], function () { });
});

// combined
gulp.task("build:js", sequence(["build:scripts", "build:modules"]));
gulp.task("build:css", ["build:sass"]);
gulp.task("build:assets", sequence(["build:assets:html", "build:assets:vendor", "build:assets:images"]));
gulp.task("clean:build", sequence(["clean:app", "clean:vendor"]));

gulp.task("watch:sources", ["watch:assets", "watch:sass", "watch:scripts"]);

// run all tasks
gulp.task("build", sequence(["clean:app", "build:js", "build:css", "build:assets"]));


//Default task
gulp.task('default', sequence(['build']));

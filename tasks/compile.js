const gulp = require('gulp');
const debug = require('gulp-debug');
const size = require('gulp-size');
const del = require('del');
const ts = require("gulp-typescript");
const mkdirp = require('mkdirp');

const tsProject = ts.createProject("tsconfig.json");

gulp.task('compile', function (done) {

    del(["dist/**"]).then(function () {
        gulp.src('src/**/*.{ts,js}')
            .pipe(tsProject())
            .js
            .pipe(debug({
                title: 'ts'
            }))
            .pipe(gulp.dest('dist/'))
            .pipe(size({
                title: 'compile'
            }))
            .resume()
            .on('end', function () {
                done();
            })
    });
});
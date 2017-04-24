const gulp = require('gulp');
const yarn = require('gulp-yarn');
const gutil = require('gulp-util');
const del = require('del');

const exec = require('child_process').exec;

gulp.task('install', function (done) {
    Promise.resolve()
        .then(function () {
            gutil.log("deleting files in build/stage/...");
            return del(["build/stage/**"])
        })
        .then(function () {
            return gulp.src(['./package.json', './yarn.lock'])
                .pipe(gulp.dest('./build/stage'))
                .pipe(yarn({production: true}))
                .resume()
                .on('end', function () {
                    gutil.log("pruning dev dependencies....");
                    exec('npm prune --production', {cwd: "./build/stage"}, done)
                });
        })
});
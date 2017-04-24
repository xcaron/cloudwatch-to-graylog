const gulp = require('gulp');
const addsrc = require('gulp-add-src');
const zip = require('gulp-zip');
const moment = require('moment');
const debug = require('gulp-debug');
const size = require('gulp-size');

const package = require('../package.json')

gulp.task('package', ['install', 'compile'], function (done) {

    var artifactName = `${package.name}-${moment().format("YYYYMMDD_HHmmss")}.zip`;

    gulp.src('./build/stage/node_modules/**', {base: './build/stage/'})
        .pipe(addsrc(['dist/**']))
        .pipe(zip(artifactName))
        .pipe(gulp.dest('build'))
        .pipe(debug({
            title: 'zip'
        }))
        .pipe(size({
            title: 'package',
            gzip: true
        }))
        .on('end', function () {
            done();
        });
});
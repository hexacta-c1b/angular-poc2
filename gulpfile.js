const gulp = require('gulp');
var fs = require('fs');
var util = require('gulp-util');
var file = require('gulp-file');
var prettier = require('gulp-plugin-prettier');

function defaultTask(cb) {
  // place code for your default task here
  util.log('executed the default task');
  cb();
}

function dummyTask(cb) {
  util.log('this is another task');
  cb();
}

function genFile(cb) {
  util.log('generating build_date.txt');
  file('build_date.txt', new Date()).pipe(gulp.dest('./'));
  cb();
}

// replace unformatted with formatted
function format() {
  return gulp
    .src(['./src/**/*.ts', './gulpfile.js'])
    .pipe(prettier.format({ singleQuote: true }))
    .pipe(gulp.dest((file) => file.base));
  cb();
}

exports.default = defaultTask;
exports.dummyTask = dummyTask;
exports.genfile = genFile;
exports.prettier = format;

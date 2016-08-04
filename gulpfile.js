var gulp = require('gulp');
var path = require('path');
var ts = require('gulp-typescript');
var del = require('del');
var runSequence = require('run-sequence');
var gls = require('gulp-live-server');
var mocha = require('gulp-mocha');

var config = {
  "buildDir":   "dist/",
  "tsOptions":  {
    "target":                 "ES6",
    "module":                 "commonjs",
    "sourceMap":              true,
    "emitDecoratorMetadata":  true,
    "experimentalDecorators": true,
    "removeComments":         false,
    "noImplicitAny":          false,
    "typescript":             require('typescript'),
    "sortOutput":             true
  },
  "files":      [
    "node_modules/reflect-metadata/reflect-metadata.d.ts",
    "node_modules/inversify-dts/inversify/inversify.d.ts",
    "typings/index.d.ts",
    "src/**/*.ts"
  ],
  "watchFiles": [
    "src/**/*.ts"
  ]
};

gulp.task('default', ['build']);

/**
 * Build application
 */
gulp.task('build', function (callback) {
  runSequence('clean', 'copy', 'compile', callback);
});

/**
 * Compile typescript
 */
gulp.task('compile', function () {
  return gulp
    .src(config.files)
    .pipe(ts(config.tsOptions))
    .pipe(gulp.dest(config.buildDir));
});


/**
 * Copy non typescript files
 */
gulp.task('copy', function () {
  return gulp.src(["!src/services/**/*.ts", "src/services/**/*"], {base: './src'}).pipe(gulp.dest(config.buildDir));
});

/**
 * Delete build files
 */
gulp.task('clean', function () {
  return del(config.buildDir);
});

/**
 * Watch files and build
 */
gulp.task('watch', [ 'build' ], function () {
  gulp.watch(config.watchFiles, [ 'build' ]);
});

/**
 * Run server and worker
 */
gulp.task('serve', ['build'], function () {
  var server = gls('dist/server.js', undefined, false);
  var worker = gls('dist/worker.js', undefined, false);
  server.start();
  worker.start();
  gulp.watch(config.watchFiles, function () {
    runSequence('compile', () => {
      server.start.bind(server)();
      worker.start.bind(worker)();
    });
  });
});

/**
 * Invoke tests
 */
gulp.task('test', ['build'], function () {
  return gulp.src('dist/**/*.{test,spec}.js',  {read: false}).pipe(mocha());
});

gulp.task('test:services', ['build'], function () {
  return gulp.src('dist/services/**/*.{test,spec}.js',  {read: false}).pipe(mocha());
});

gulp.task('test:app', ['build'], function () {
  return gulp.src('dist/app/**/*.{test,spec}.js',  {read: false}).pipe(mocha());
});

gulp.task('test:scservice', ['build'], function () {
  return gulp.src('dist/services/scExtractor/**/*.{test,spec}.js',  {read: false}).pipe(mocha());
});
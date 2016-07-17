// Include gulp
var gulp = require("gulp"),

// Include Our Plugins
  jshint = require("gulp-jshint"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  clean = require("gulp-clean"),
  del = require("del"),
  connect = require("gulp-connect"),
  open = require("gulp-open"),
  os = require("os"),

// Configuration options
  config = {
    file: {
      name: "ngstrap-modals"
    },
    paths: {
      sass: "./resources/sass",
      bower: "./bower_components",
      js: "./resources/js",
      dest: "./dist"
    },
    url: "localhost:8080/index.html"
  };

gulp
// Lint Task
  .task("lint", function () {
    return gulp.src(config.paths.js + "/*.js")
      .pipe(jshint())
      .pipe(jshint.reporter("default"));
  })

  // Compile SASS, concatenate and minify CSS
  .task("sass", function () {
    return gulp.src(config.paths.sass + "/*.scss")
      .pipe(sass({
        includePaths: [
          config.paths.sass,
          config.paths.bower + "/bootstrap-sass/assets/stylesheets"
        ]
      }))
      .pipe(concat(config.file.name + ".css"))
      .pipe(gulp.dest(config.paths.dest))
      .pipe(rename(config.file.name + ".min.css"))
      .pipe(uglify())
      .pipe(gulp.dest(config.paths.dest));
  })

  // Concatenate & minify JS
  .task("scripts", function () {
    return gulp.src(config.paths.js + "/*.js")
      .pipe(concat(config.file.name + ".js"))
      .pipe(gulp.dest(config.paths.dest))
      .pipe(rename(config.file.name + ".min.js"))
      .pipe(uglify())
      .pipe(gulp.dest(config.paths.dest));
  })

  // Watch Files For Changes
  .task("watch", function () {
    gulp.watch(config.paths.js + "/*.js", ["lint", "scripts"]);
    gulp.watch(config.paths.sass + "/*.scss", ["sass"]);
  })

  // Cleans the assets
  .task("clean", function () {
    return del(config.paths.dest);
  })

  // Builds the app
  .task("build", ["clean", "lint", "sass", "scripts"])

  // Starts a local server
  .task("connect", function () {
    connect.server({
      root: ".",
      livereload: true
    });
  })

  // Opens browser with the local server URL
  .task("open", function () {
    return open(config.url);
  })

  // Default Task
  .task("default", ["build", "watch"])

  // Serves the demo site through local server
  .task("serve", ["build", "connect", "watch", "open"]);

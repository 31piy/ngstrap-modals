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
  templateCache = require("gulp-angular-templatecache"),
  addStream = require("add-stream"),
  htmlmin = require("gulp-htmlmin"),

// Configuration options
  config = {
    paths: {
      sass: "./resources/sass",
      js: "./resources/js",
      dest: "./dist",
      templates: "./resources/templates"
    }
  };

function prepareTemplates() {
  return gulp.src(config.paths.templates + "/**/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(templateCache({
      module: "ngstrapModals"
    }));
}

gulp

  .task("sass", function () {
    return gulp.src(config.paths.sass + "/demo.scss")
      .pipe(sass())
      .pipe(gulp.dest(config.paths.dest))
      .pipe(connect.reload());
  })

  .task("watch", function () {
    gulp.watch(config.paths.js + "/**/*.js", ["scripts-demo"]);
    gulp.watch(config.paths.templates + "/**/*.html", ["scripts-demo"]);
    gulp.watch(config.paths.sass + "/**/*.scss", ["sass"]);
  })

  .task("clean", function () {
    return del(config.paths.dest);
  })

  .task("scripts-demo", function () {
    return gulp.src(config.paths.js + "/**/*.js")
      .pipe(addStream.obj(prepareTemplates()))
      .pipe(concat("demo.js"))
      .pipe(gulp.dest(config.paths.dest))
      .pipe(connect.reload());
  })

  .task("build-dist", ["clean"], function () {
    return gulp.src(config.paths.js + "/ngstrap-modals.js")
      .pipe(addStream.obj(prepareTemplates()))
      .pipe(concat("ngstrap-modals.min.js"))
      .pipe(uglify())
      .pipe(gulp.dest(config.paths.dest))
      .pipe(connect.reload());
  })

  .task("build-demo", ["clean", "sass", "scripts-demo"])

  .task("connect", function () {
    connect.server({
      root: ".",
      livereload: true
    });
  })

  .task("open", function () {
    return open("localhost:8080/index.html");
  })

  .task("serve", ["build-demo", "connect", "watch", "open"]);

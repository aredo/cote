module.exports = function(grunt) {

  /*
  Dynamically load npm tasks
   */
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      all: {
        files: [
            "Gruntfile.js"
          , "public/js/**/*.js"
          , "public/less/*.less"
          , "public/less/**/*.less"
        ],
        tasks: [
            "clean"
          , "concat"
          , "less"
        ],
        options: {
          nospawn: true
        }
      }
    },
    concat: {
      options: {
        separator: ";"
      },
      bootstrap: {
        src: [
            "public/js/bootstrap/transition.js"
          , "public/js/bootstrap/alert.js"
          , "public/js/bootstrap/button.js"
          , "public/js/bootstrap/carousel.js"
          , "public/js/bootstrap/collapse.js"
          , "public/js/bootstrap/dropdown.js"
          , "public/js/bootstrap/modal.js"
          , "public/js/bootstrap/tooltip.js"
          , "public/js/bootstrap/popover.js"
          , "public/js/bootstrap/scrollspy.js"
          , "public/js/bootstrap/tab.js"
          , "public/js/bootstrap/affix.js"
        ],
        dest: "public/js/bootstrap.js"
      },
      buzzer: {
        src: [
           "public/js/plugins/nprogress.js"
          ,"public/js/shared/global.js"
          ,"public/js/buzzer/user.js"
          ,"public/js/buzzer/home.js"
          ,"public/js/buzzer/trick.js"
        ],
        dest: "public/js/buzzer.js"
      },
      advertiser: {
        src: [
            "public/js/plugins/nprogress.js"
          , "public/js/shared/global.js"
          , "public/js/advertiser/*.js"
        ],
        dest: "public/js/advertiser.js"
      },
      plugins: {
        src: [
          "public/js/plugins/*"
        ],
        dest: "public/js/plugins.js"
      }
    },
    jshint: {
      options: {
        jshintrc: "js/bootstrap/.jshintrc"
      },
      src: {
        src: "js/bootstrap/*.js"
      }
    },
    uglify: {
      options: {
        report: "min",
        compress: {
          dead_code: true,
          drop_console: true
        }
      },
      main_script: {
        src: [
           "<%= concat.bootstrap.dest %>"
          , "public/js/plugins.js"
          , "public/js/buzzer.js"
        ],
        dest: "public/assets/js/buzzer.min.js"
      }
    },
    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: "bootstrap.css.map",
          sourceMapFilename: "public/css/bootstrap.css.map"
        },
        files: {
          "public/css/bootstrap.css": "public/less/bootstrap/bootstrap.less"
        }
      },
      compileBuzzer: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: "buzzer.css.map",
          sourceMapFilename: "public/css/buzzer.css.map"
        },
        files: {
          "public/css/buzzer.css": "public/less/buzzer.less"
        }
      },
      compileAdvertiser: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: "advertiser.css.map",
          sourceMapFilename: "public/css/advertiser.css.map"
        },
        files: {
          "public/css/advertiser.css": "public/less/advertiser.less"
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          "public/assets/css/buzzer.min.css": [
              "public/css/bootstrap.css"
            , "public/css/buzzer.css"
          ]
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: "public/img/",
            src: ["**"],
            dest: "public/assets/img"
          }, {
            expand: true,
            cwd: "public/fonts/",
            src: ["**"],
            dest: "public/assets/fonts"
          }
        ]
      }
    },
    clean: {
      dev: [
          "public/js/buzzer.js"
        , "public/js/advertiser.js"
        , "public/js/bootstrap.js"
        , "public/js/plugins.js"
        , "public/css/*"
      ],
      build: ["public/assets/*"]
    }
  });
  grunt.registerTask("less-compile", ["clean:dev", "less"]);
  grunt.registerTask("dev", ["clean:dev", "less", "concat"]);
  grunt.registerTask("default", ["dev", "watch"]);
  grunt.registerTask("production", ["clean:build", "less", "cssmin", "copy", "concat", "uglify"]);
};

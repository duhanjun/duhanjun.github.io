module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    jekyll: {
      options: {
        bundleExec: true,
        dest: "_site",
        drafts: false,
        future: true,
        increment: true,
        serve: false,
        safe: false
      },
      serve: {
        options: {
          dest: "_site",
          drafts: false,
          future: true,
          increment: true,
          serve: true,
          safe: false,
          watch: true,
          port: "4000",
          host: "0.0.0.0",
          baseurl: ""
        }
      },
      build: {
        options: {
          dest: "_site",
          drafts: false,
          future: true,
          increment: false,
          safe: false
        }
      }
    },

    uglify: {
      options: {
        compress: {
          drop_console: true
        },
        mangle: true,
        output: {
          comments: false
        }
      },
      hux: {
        files: {
          "js/hux-blog.min.js": ["js/hux-blog.js"]
        }
      }
    },

    cssmin: {
      options: {
        mergeIntoShorthands: true,
        roundingPrecision: -1
      },
      hux: {
        files: {
          "css/hux-blog.min.css": ["css/hux-blog.css"]
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      jekyll: {
        files: [
          "_layouts/**/*.html",
          "_includes/**/*.html",
          "_posts/**/*",
          "css/**/*.css",
          "js/**/*.js"
        ],
        tasks: ["jekyll:serve"],
        options: {
          event: ["changed", "added", "deleted"],
          interrupt: false
        }
      },
      assets: {
        files: ["js/**/*.js", "css/**/*.css"],
        tasks: ["uglify", "cssmin"],
        options: {
          interrupt: false
        }
      }
    }
  });

  grunt.registerTask("serve", ["jekyll:serve"]);
  grunt.registerTask("build", ["jekyll:build", "uglify", "cssmin"]);
  grunt.registerTask("default", ["build"]);
};

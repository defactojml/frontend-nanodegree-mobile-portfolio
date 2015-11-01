/**
 * Created by jean-michel-legrand on 11/10/15.
 */

module.exports = function (grunt) {

  grunt.initConfig({
    person: {
      firstName: "eddy"
    },
    pkg: grunt.file.readJSON("package.json"),

    clean: {
      options: {
        force: true
      },
      basic_target: ['dist'],
      apache_target: ['../../perf']
    },
    uglify: {
      // minification in dedicated files
      basic_target: {
        files: {
          'dist/js/perfmatters.min.js': ['js/perfmatters.js'],
          'dist/views/js/main.min.js': ['views/js/main.js']
        }
      },
      // minification in a single file
      advanced_target: {
        files: {
          'dist/advanced/<%= pkg.name %>.min.js': ['js/perfmatters.js', 'views/js/main.js']
        }
      }
    },
    cssmin: {
      basic_target: {
        files: {
          'dist/css/print.css': ['css/print.css'],
          'dist/css/style.css': ['css/style.css'],
          'dist/views/css/style.css': ['views/css/style.css'],
          'dist/views/css/bootstrap-grid.css': ['views/css/bootstrap-grid.css']
        }
      },
      advanced_target: {
        files: {
          'output.css': ['css/**/*.css']
        }
      }
    },
    copy: {
      basic_target: {
        files: [
          {
            src: ['project-2048.html', 'project-mobile.html', 'project-webperf.html'],
            dest: 'dist/'
          },
          /*{
           cwd: 'img/',
           dest: 'dist/imgages/',
           src: ['*'],
           expand: true,
           filter: 'isFile'
           }*/
          {
            cwd: 'views/images/',
            dest: 'dist/views/images/',
            src: ['*'],
            expand: true,
            filter: 'isFile'
          }
        ]
      },
      apache_target: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: '../../perf/'
          }
        ]
      }
    },
    targethtml: {
      release: {
        files: {
          'dist/index.html': 'index.html',
          'dist/project-2048.html': 'project-2048.html',
          'dist/project-mobile.html': 'project-mobile.html',
          'dist/project-webperf.html': 'project-webperf.html',
          'dist/views/pizza.html': 'views/pizza.html'
        }
      }
    },
    imagemin: {
      basic_target: {
        files: [{
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/img/',
          expand: true
        }]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  grunt.registerTask("build", ['clean:apache_target', 'clean:basic_target', 'uglify:basic_target', 'cssmin:basic_target', 'copy:basic_target', 'imagemin:basic_target', 'targethtml:release', 'copy:apache_target']);

};
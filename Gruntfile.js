'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        keepSpecialComments: 0
      },
      target: {
        files: {
          'build/css/all.min.css': ['vendor/semantic-ui/semantic.css', 'dist/css/main.css']
        }
      }
    },

    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['uglify:watch'],
        options: {
          spawn: false
        },
      },
    },

    uglify: {
      watch: {
        files: {
          'build/js/index.min.js': ['dist/js/index.js']
        }
      },
      default: {
        files: {
          'build/js/libraries.min.js': ['vendor/angularjs/angular.min.js', 'vendor/jquery/jquery-1.11.3.min.js', 'vendor/semantic-ui/semantic.min.js', 'vendor/gojs/go.js'],
          'build/js/index.min.js': ['dist/js/index.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'cssmin',
    'uglify'
  ]);
};
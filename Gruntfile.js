'use strict';

// jshint node:true

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'uglify': {
      'options': {
        'banner': '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      'build': {
        'src': 'cvr.js',
        'dest': 'cvr.min.js'
      }
    },
    'gh-pages': {
      'options': {
        'base': './'
      },
      'deploy': {
        'src': ['index.html','cvr.js', 'cvr.min.js']
      }
    },
    'jshint': {
      'options': {
        'jshintrc': true,
        'reporter': require('jshint-stylish')
      },
      'src': {
        'files': {
          'src': ['*.js', '!*.min.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['jshint:src', 'uglify:build']);
  grunt.registerTask('deploy', ['default', 'gh-pages:deploy']);
};

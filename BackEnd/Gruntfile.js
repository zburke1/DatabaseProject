// Generated on 2015-11-20 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
 
  grunt.initConfig({
      php: {
          test: {
              options: {
                  base: 'app',
                  port: 8010,
                  keepalive: true,
                  open: true
              }
          }
      }
  });

  grunt.registerTask('server', ['php'])
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      options: {
        livereload: true,
      },
      html: {
        files: ['index.html'],
      },
      js: {
        files: ['app/views/*.js'],
        tasks: ['jshint'],
      },
      css: {
        files: ['app/styles/*.css'],
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
    },

    connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost',
          livereload: 35729,
          // open: true,
          // base: ['app']
          },
        }
      },
      jshint: {
        files: ['js/  *.js'],
      },
      bowerInstall: {
        target: {
          src: ['/index.html'],
        }
    },
  });

  // Actually running things.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-bower-install');

  // Default task(s).
  grunt.registerTask('default', ['bowerInstall', 'connect', 'watch']);
};
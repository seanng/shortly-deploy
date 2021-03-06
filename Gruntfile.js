module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      lib: {
        src: ['public/lib/*.js'],
        dest: 'public/dist/lib.min.js'
      },
      client: {
        src: ['public/client/*.js'],
        dest: 'public/dist/client.min.js'
      }
    },


    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      lib: {
        src: 'public/dist/lib.min.js',
        dest: 'public/dist/lib.min.js'
      },
      client: {
        src: 'public/dist/client.min.js',
        dest: 'public/dist/client.min.js'
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        'app/config.js', 
        'app/**/*.js',
        'lib/*.js',
        'public/client/*.js',
        'public/lib/*.js'
      ]
    },

    cssmin: {
      minify: {
        src: 'public/style.css',
        dest: 'public/dist/style.min.css' 
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {},
      commit: {
        command: 'git add . && git commit'
      },
      deploy: {
        command: 'git push live master'
      },
      github: {
        command: 'git add . && git commit && git push origin master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin',
    // 'shell:commit',
    'shell:github'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    'mochaTest',
    'eslint',
    'build',
    'shell:deploy'
  ]);


};

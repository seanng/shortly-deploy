module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      lib: {
        src: ['lib/*.js'],
        dest: 'public/dist/lib.min.js'
      },
      app: {
        src: ['app/**/*.js', 'app/*.js'],
        dest: 'public/dist/app.min.js'
      },
      public: {
        src: ['public/**/*.js'],
        dest: 'public/dist/public.min.js'
      }
      // style: {
      //   src: ['public/*.css'],
      //   dest: 'public/dist/style-min.css'
      // }
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
      app: {
        src: 'public/dist/app.min.js',
        dest: 'public/dist/app.min.js'
      },
      public: {
        src: 'public/dist/public.min.js',
        dest: 'public/dist/public.min.js'
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
      ]
    },

    cssmin: {
      src: 'public/style.css',
      dest: 'public/dist/style.min.css'
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
      deploy: {
        command: 'git add . && git commit && git push live master'
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
    'concat',
    'uglify',
    'shell:deploy'
  ]);


};

/*************************************************************************************************
Date: 02/09/2014
Developer: Gabriel Ferraz
Company: Purple Rock Scissors
Project: Florida Hospital

  1. This file sets up grunt tasks 
  2. Tasks: 
    a) uglify - plugin: https://github.com/gruntjs/grunt-contrib-uglify
    b) compass - plugin: https://github.com/gruntjs/grunt-contrib-compass
    c) watch - plugin: https://github.com/gruntjs/grunt-contrib-watch
  3. Watch Task: will watch for changes on script files, sass files, and html. 
     It will automate sass compilation and minification, and will automate js minification
  4. Watch will also perform autoreload so our html page will be updated when we save changes on files (html, sass, js) without the need to refresh the browser 
*************************************************************************************************/

module.exports = function(grunt){

  // Load plugins 
  grunt.loadNpmTasks ( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks ( 'grunt-contrib-compass' );
  grunt.loadNpmTasks ( 'grunt-contrib-watch' );
  
  //config 
  grunt.initConfig ( {
    pkg : grunt.file.readJSON ( 'package.json' ),
    uglify : {
      my_target : {
        files : {
          '_/js/script.js' : [ 'public/components/js/*.js' ]
        }//file
      }//my_target
    },//uglify

    compass : {
      dev : {
        options : {
          config: 'config.rb'
        }//options
      }//dev
    },//compass

    watch : {
      // If enabled, a live reload server will be started with the watch task per target. Then after the indicated tasks have run, the live reload server will be triggered with the modified files, meaning once the watch task is running all changes we make will take effect
      options : { livereload: true },
      
      //watches and uglifies the scripts for every change we make. If only this task is being watched, the object "scripts" is unnecessary. We can simply use the files array and the tasks array and it will work fine
      scripts : {
        files : [ 'public/components/js/carousel.js','public/components/js/script.js'],
        tasks : [ 'uglify' ]
      },//scripts
      
     //watches for changes in the scss and performs a task when the file is changed. Task is defined above in the compass object. It is going to look in the config.rb file and execute whatever is there. This will allow us to compile sass into css on save without having to run the sass command "sass --watch input.scss:output.css" in the terminal */
      sass : {
        files : [ 'public/components/sass/*.scss','public/components/sass/*/*.scss'  ], 
        tasks : [ 'compass:dev' ]
      },//compsass

      //watches for changes in the html
      html : {
        files : [ '*.html' ]
      }
    }//watch 
  })//init config

  grunt.registerTask ( 'default', 'watch' );//allows to run the grunt command on terminal without further instructions. It will trigger this defalt task, which we set as 'watch'. Without this line we would have to run a grunt command for each task, such as grunt uglify, or grunt compass, etc

}//exports
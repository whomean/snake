module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  	browserSync: {
		    bsFiles: {
		        src : ['css/*.css', 'js/*.js']
		    },
		    options: {
		        server: {
		            baseDir: "./"
		        },
		        watchTask: true
		    }
	},

	sass: {
	    options: {
	    	sourceMap: true
	    },
	      	dist: {
	        	files: {
	          	'css/style.css': 'sass/*.scss'
	        	}
	      	}
    },

    watch: {
	    scripts: {
	        files: ['sass/*.scss'],
	        tasks: ['sass'],
	        options: {
	            spawn: false,
	        },
	    }
	}

  });
  // Load the plugins tasks
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['sass', 'browserSync', 'watch']);
};
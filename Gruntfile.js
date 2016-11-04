module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
	  concat: {
	    js: {
	      src: ['js/jquery.js', 'js/boostrap.min.js', 'js/jquery.easing.min.js', 'js/scrolling-nav.js'],
	      dest: 'build/js/scripts.js',
	    },
	    css: {
	      src: ['css/bootstrap.min.css', 'css/scrolling-nav.css'],
	      dest: 'build/css/styles.css',
	    },
	  },    
	  watch: {
	    js: {
	      files: ['js/**/*.js'],
	      tasks: ['concat:js'],
	    },
	    css: {
	      files: ['css/**/*.css'],
	      tasks: ['concat:css', 'cssmin'],
	    },
	  },
	  cssmin: {
	    options: {
	      shorthandCompacting: false,
	      roundingPrecision: -1
	    },
	    target: {
	      files: {
	        'build/css/styles.min.css': ['build/css/styles.css']
	      }
	    }
	  }

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['concat', 'cssmin', 'watch']);
}
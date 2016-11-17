module.exports = function (grunt) {

    // Do grunt-related things in here
    grunt.initConfig({

        // Paths (use with <%= path %> for example)
        src: 'src',
        coreBundle: 'coreBundle',
        dest: 'web',

        // Store the project settings from the package.json file into the pkg property
        pkg: grunt.file.readJSON('package.json'),

        // Sass task options
        sass: {
            dist: {
                options: {
                    trace: true,
                    style: 'expanded'
                },
                files: {
                '<%= dest %>+/styles/main.css': '<%= src %>/<%= coreBundle %>/styles/sass/main.sass'
                }
            }
        },

        // Autoprefixer task options
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'ie >= 10']     // Global usage greater than 1%, or last 2 versions of each major browser, or greater than or equal to IE9
            },
            dist: {
                files: {
                    '<%= dest %>/styles/main.css': '<%= dest %>/styles/main.css'
                }
            }
        },

        // CSSComb task options
        csscomb: {
            options: {
                config: '<%= src %>/<%= coreBundle %>/styles/csscomb.json'
            },
            dist: {
                expand: true,
                cwd: '<%= dest %>/styles/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= dest %>/styles/'
            }
        },

        // Cssmin task options
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= dest %>/styles',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= dest %>/styles',
                    ext: '.min.css'
                }]
            }
        },

        // Imagemin task options
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3,    // From 0 to 7 (3: default)
                    progressive: false       // Set false for lossless jpg conversion
                },
                files: [{
                    expand: true,
                    cwd: '<%= src %>/<%= coreBundle %>/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= dest %>/img/'
                }]
            }
        },

        // Watch task options
        watch: {
            // Watch any changes in config files like Gruntfile.js, then reload watch task
            configFiles: {
                files: 'Gruntfile.js',
                options: {
                    reload: true
                }
            },
            // Watch sass changes
            sass: {
                files: ['<%= src %>/<%= coreBundle %>/styles/sass/**/*.sass'],
                tasks: ['sass', 'autoprefixer', 'csscomb:dist']
            },
            // Watch imagemin changes
            images: {
                files: '<%= src %>/<%= coreBundle %>/img/!**/!*.{png,jpg,gif}',
                tasks: 'newer:imagemin',
                options: {
                    event: ['added', 'changed', 'deleted']
                }
            }
        }

    });

    // Load packages
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Set tasks to run from command line
    grunt.registerTask('default', ['sass', 'autoprefixer', 'csscomb', 'imagemin', 'watch']);
    grunt.registerTask('prod', ['sass', 'autoprefixer', 'csscomb', 'cssmin', 'imagemin']);
};
var gulp = require('gulp'),
    php  = require('gulp-connect-php');

gulp.task('php', function() {
    php.server({ base: 'php', port: 8010, keepalive: true});
});
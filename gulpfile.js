const   
gulp            = require('gulp'),
pug             = require('gulp-pug'),
browserSync     = require('browser-sync'),        
reload          = browserSync.reload;

// Browser-sync task
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: './demo',
        }
    });
});


gulp.task('pug', () => {
    return gulp.src('./src/pug/templates/*.pug')
            .pipe(pug({ pretty: true }))
            .pipe(gulp.dest('./dist'))
            .pipe(gulp.dest('./demo/templates'))
            .pipe(reload({ stream: true }));
});

gulp.task('demo', () => {

    return [
        gulp.src('./node_modules/brickyeditor/dist/**/*')
            .pipe(gulp.dest('./demo/lib'))
            .pipe(reload({ stream: true })),

        gulp.src('./src/pug/demo/pages/*.pug')
            .pipe(pug({ pretty: true }))
            .pipe(gulp.dest('./demo'))
            .pipe(reload({ stream: true }))
    ]
});


// changes tracking 
gulp.task('watcher',function(){
    gulp.watch('./src/pug/**/*', ['pug', 'demo']);
});


gulp.task('default', ['pug', 'demo', 'watcher', 'browserSync']);
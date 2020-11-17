// VARIABLES & PATHS
let preprocessor = 'sass', // Preprocessor (sass, scss, less, styl)
    fileswatch   = 'html,htm,txt,json,md,woff2,php', // List of files extensions for watching & hard reload (comma separated)
    pageversion  = 'html,htm,php', // List of files extensions for watching change version files (comma separated)
    imageswatch  = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
    online       = true, // If «false» - Browsersync will work offline without internet connection
    basename     = require('path').basename(__dirname),
    forProd      = [
					'/**',
					' * @author Alexsab.ru',
					' */',
					''].join('\n');

const { src, dest, parallel, series, watch, task } = require('gulp'),
	sass           = require('gulp-sass'),
	cleancss       = require('gulp-clean-css'),
	concat         = require('gulp-concat'),
	browserSync    = require('browser-sync').create(),
	uglify         = require('gulp-uglify-es').default,
	autoprefixer   = require('gulp-autoprefixer'),
	imagemin       = require('gulp-imagemin'),
	newer          = require('gulp-newer'),
	rsync          = require('gulp-rsync'),
	del            = require('del'),
	connect        = require('gulp-connect-php'),
	header         = require('gulp-header'),
	notify         = require('gulp-notify'),
	rename         = require('gulp-rename'),
	responsive     = require('gulp-responsive'),
	pngquant       = require('imagemin-pngquant'),
	merge          = require('merge-stream'),
	// version        = require('gulp-version-number'),
	// revAll         = require('gulp-rev-all'),
	{ spawn, exec } = require('child_process'),
	replace        = require('gulp-replace');

if(typeof projects == 'undefined') 
	global.projects = {};
if(typeof port == 'undefined') 
	global.port = 8100;
if(typeof jekyllPort == 'undefined') 
	global.jekyllPort = 4000;


projects.newtonteach_ui = {

	port: ++port,
	jekyllPort: ++jekyllPort,

	base: basename,
	dest: basename,

	styles: {
		src:	basename + '/' + preprocessor + '/styles.'+preprocessor,
		watch:    basename + '/' + preprocessor + '/**/*.'+preprocessor,
		dest:   basename + '/css',
		output: 'styles.css',
	},

	scripts: {
		src: [
			basename + '/libs/jquery/dist/jquery.min.js',
			basename + '/js/common.js', // Custom scripts. Always at the end
		],
		dest:       basename + '/js',
		output:     'scripts.min.js',
	},

	code: {
		src: [
			basename  + '/**/*.{' + fileswatch + '}',
		],
	},

	styles_jekyll: {
		src:	'src/' + preprocessor + '/styles.'+preprocessor,
		watch:    'src/' + preprocessor + '/**/*.'+preprocessor,
		dest:   'css',
		output: 'styles.css',
	},

	scripts_jekyll: {
		src: [
			'src/libs/jquery/dist/jquery.min.js',
			'src/js/common.js', // Custom scripts. Always at the end
		],
		dest:       'js',
		output:     'scripts.min.js',
	},

	code_jekyll: {
		src: [
			'**/*.{' + fileswatch + '}',
		],
	},

	forProd: [
		'/**',
		' * @author https://github.com/newstreetpunk',
		' * @author https://github.com/alexsab',
		' */',
		''].join('\n'),
}



/* newtonteach_ui BEGIN */

// Local Server
function newtonteach_ui_browsersync() {
	connect.server({
		port: projects.newtonteach_ui.port,
		base: projects.newtonteach_ui.base,
	}, function (){
		browserSync.init({
			// server: { baseDir: projects.newtonteach_ui.base + '/' },
			proxy: '127.0.0.1:' + projects.newtonteach_ui.port,
			notify: false,
			online: online
		});
	});
};

// Custom Styles
function newtonteach_ui_styles() {
	return src(projects.newtonteach_ui.styles.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.newtonteach_ui.styles.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.newtonteach_ui.styles.dest))
	.pipe(browserSync.stream())

};

// Scripts & JS Libraries
function newtonteach_ui_scripts() {
	return src(projects.newtonteach_ui.scripts.src)
	.pipe(concat(projects.newtonteach_ui.scripts.output))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.newtonteach_ui.forProd))
	.pipe(dest(projects.newtonteach_ui.scripts.dest))
	.pipe(browserSync.stream())
};

function newtonteach_ui_watch() {
	watch(projects.newtonteach_ui.styles.watch, newtonteach_ui_styles);
	watch(projects.newtonteach_ui.scripts.src, newtonteach_ui_scripts);

	watch(projects.newtonteach_ui.code.src).on('change', browserSync.reload);
};


function newtonteach_ui_browsersync_jekyll() {
	browserSync.init({
		proxy: '127.0.0.1:' + projects.newtonteach_ui.jekyllPort,
		notify: false,
		online: online
	});
};

// Custom Styles
function newtonteach_ui_styles_jekyll() {
	return src(projects.newtonteach_ui.styles_jekyll.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.newtonteach_ui.styles_jekyll.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.newtonteach_ui.styles_jekyll.dest))
	.pipe(browserSync.stream())

};

// Scripts & JS Libraries
function newtonteach_ui_scripts_jekyll() {
	return src(projects.newtonteach_ui.scripts_jekyll.src)
	.pipe(concat(projects.newtonteach_ui.scripts.output))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.newtonteach_ui.forProd))
	.pipe(dest(projects.newtonteach_ui.scripts_jekyll.dest))
	.pipe(browserSync.stream())
};

function newtonteach_ui_watch_jekyll() {
	watch(projects.newtonteach_ui.styles_jekyll.watch, newtonteach_ui_styles_jekyll);
	watch(projects.newtonteach_ui.scripts_jekyll.src, newtonteach_ui_scripts_jekyll);

	watch(projects.newtonteach_ui.code_jekyll.src).on('change', browserSync.reload);
};

function newtonteach_ui_cd_jekyll(callback) {

	process.chdir(process.cwd()+'/'+basename);
	// console.log(process.cwd());
}
function newtonteach_ui_run_jekyll(callback) {

	console.log('if you get error message: "Address already in use", run next command:');
	console.log('lsof -i :<PORT> — show you what process run on your port');
	console.log('kill -9 <PID> —  kill that process by PID');

	var build = exec('bundle exec jekyll serve --port ' + projects.newtonteach_ui.jekyllPort);
	// var build = spawn('bundle', ['exec', 'jekyll', 'serve']);

	build.stdout.on('data', (data) => {
	  console.log(`stdout: ` + data);
	});

	build.stderr.on('data', (data) => {
	  console.error(`stderr: ${data}`);
	});

	build.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	});

	return build;
}

exports.newtonteach_ui_jekyll = parallel(newtonteach_ui_styles_jekyll, newtonteach_ui_scripts_jekyll, newtonteach_ui_browsersync, newtonteach_ui_watch_jekyll);
exports.newtonteach_ui_run_jekyll = parallel(newtonteach_ui_cd_jekyll, newtonteach_ui_styles_jekyll, newtonteach_ui_scripts_jekyll, newtonteach_ui_run_jekyll, newtonteach_ui_browsersync_jekyll, newtonteach_ui_watch_jekyll);
exports.newtonteach_ui = parallel(newtonteach_ui_styles, newtonteach_ui_scripts, newtonteach_ui_browsersync, newtonteach_ui_watch);


/* newtonteach_ui END */


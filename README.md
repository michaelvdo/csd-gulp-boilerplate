# CSD - AMD frontend boilerplate

The CSD - AMD frontend boilerplate contains the bare minimum necessary to start a new project. The boilerplate uses npm and bower for package management, and gulp as a task runner. SASS is used as a CSS preprocessor and jQuery is the js library of choice. The boilerplate is aimed for usage with AEM projects. For this, the file structure for dist/ is setup as is usual for AEM projects. In case this boilerplate is used for a different kind of project, one can always customize the dist/ folder structure at the top of the gulpfile.js file.

version: 0.1.0 by Michael van den Oudenalder

## Contents of the boilerplate

The boilerplate uses gulp as a task runner. For the basics, gulp uses
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) for sass compiling,
* [node-normalize-scss](https://www.npmjs.com/package/node-normalize-scss) for adding normalize.css to the main css file (by default before any other css code),
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) for adding sourcemaps to the main css file (for debugging purposes),
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) for adding vendor prefixes automatically,
* [gulp-include](https://www.npmjs.com/package/gulp-include) for including partials in html files to break up development in separate files, and
* [browser-sync](https://www.npmjs.com/package/browser-sync) for serving and live reloading your html files (standard setup: localhost:8080).

Feel free to add any additional plugins for your own project.

## Starting guide

### Assumptions
It is assumed you have node.js and npm installed globally, as well as gulp.

### Build steps

* Clone this repo locally and remove .git/ and .gitignore.
* Open gulpfile.js and change the variable 'projectName' into the name of your project.
* Run `npm install` to install all devDependencies from package.json.
* Run `gulp init` to run the gulp init task. This task builds up dist/ according to the dist directory variables in gulpfile.js.
* To start building, run `gulp` to start a server on localhost:8080 and start watching for any changes within app/html/, app/js/ and app/styles/.

## To-do

* TBD

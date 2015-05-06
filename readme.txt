SETUP

TECHNOLOGIES USED
1) HTML5
2) Sass/Compass
3) JavaScript/jQuery
4) Gruntjs

FILE STRUCTURE
1) Sass files and js file are in the folders _/components/sass and _/components/js respectively. You should edit those files as grunt is set to perform tasks on them (i.e. compile sass and uglify js)
2) Files inside _/css and _/js should not be edited directly.
3) All sass files are imported into _/components/sass/styles.scss (grunt is compiling this file)


PROJECT DEPENDENCIES
This project uses gruntjs as its task manager. If you already have the grunt cli installed globally, skip steps 1 and 2.

1) Grunt runs on Node.js. If you don't have Node, you can download the installer directly from https://nodejs.org/
If you prefer, you can use homebrew, a packet manager for the Mac. You can learn more about the homebrew installation and why you may consider this option at: http://blog.teamtreehouse.com/install-node-js-npm-mac

2) Once you have Node.js installed, you will have access to command “npm” (node package manager), which will allow you to install node packages, including grunt. We will now install the grunt cli. Copy and paste the following line on terminal then hit enter: npm install -g grunt-cli. This will install the grunt cli globally and allow you to use the grunt command to run tasks on any directory from the terminal.

3) This project uses four grunt plugins: grunt-contrib-uglify, grunt-contrib-watch, grunt-contrib-compass, and matchdep. You need to install the plugins in the project root folder. On terminal, navigate to the project root folder—-where the file package.json is located—-and run this command: npm install. This will install all dependencies listed on the package.json file. This step finishes up the grunt setup.

4) Lastly, this project uses Ruby gem sass-globbing, which allows to import entire folders containing sass files as opposed to individual files only. You need to install this gem by running: gem install sass-globbing
(If you don’t have ruby installed, see installation steps here: https://www.ruby-lang.org/en/documentation/installation/)

5) Now, run grunt on your terminal and it will perform all tasks configured in the gruntfile.js. On terminal, navigate to the project root folder and run this command: grunt. This will start the "watch" task and the livereload option.
This means that for every change you make in files on _/components/sass or _/components/js , grunt will perform the tasks configured. Additionally, livereload will refresh your page automatically every time you save changes you make on your sass files or HTML, improving the workflow.

FURTHER DOCUMENTATION
1) If you want more detailed explanation on the grunt dependencies and how grunt is setup, the gruntfile.js is very well documented.
2) _/components/sass/styles.scss has documentation about the compass @imports used in the project

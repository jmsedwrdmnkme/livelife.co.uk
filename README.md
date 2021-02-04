# LiveLife
Front-end development build for livelife.co.uk, utilising Bootstrap v5, importable to Oracle CE as both Template and Theme.

Will play nice with the latest versions of modern browsers:-
* IE11 (not officially supported, should be A-OK, however)
* Edge
* Firefox
* Chromium
* Safari

## Get started
* git clone https://git.jamesmonk.me/james/livelife.co.uk.git
* cd livelife.co.uk
* npm install --save-dev
* gulp
* Start building using files located within /src!

## Features

### Javascript
* Bootstrap v5 JS utilisation
* Fully vanilla, no frameworks here!
* ES6 Javascript scripts process (linting, uglify, compression, concat) with backwards compatibility thanks to Babel

### CSS
* Bootstrap v5 CSS utilisation
* SASS styles process (linting, compression, autoprefixing, concat, loading of modules)

### Assets
* Bootstrap v5 HTML utilisation
* Locally hosted fonts for speed and greater control/privacy
* Mustache HTML templating process (featuring partials)
* Imagemin IMG process (image optimisation and SVG minification)
* SVG icon sprite (generated inline from SVG assets)
* BrowserSync process for local development (auto reload on file save/update)

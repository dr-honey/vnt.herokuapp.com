
/**
 * Module dependencies.
 */
var Express = require('express');
var Exphbs  = require('express3-handlebars');
var Http = require('http');
var Path = require('path');
var Routes = require('./routes');
var fs = require('fs');

var app = Express();


// all environments
app.set('views', __dirname + '/views');
app.engine('hbs', Exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
	partialsDir: [
		'views/partials/'
	]
}));

app.set('view engine', 'hbs');
app.use(Express.favicon('favicon.ico'));
app.use(Express.static(Path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(Express.errorHandler());
}
app.use(Express.json());
app.use(Express.urlencoded());
app.use(Express.methodOverride());
app.use(app.router);

app.get('/',Routes.index);

app.get('/testimonial',Routes.testimonial);
app.get('/reach-Us',Routes.reachUs);
app.get('/edit-testimonial',Routes.editTestimonial);
app.post('/edit-testimonial',Routes.saveTestimonial);
app.get('/create-testimonial',Routes.editTestimonial);
app.post('/create-testimonial',Routes.createTestimonial);
app.get('/edit-reachUs',Routes.editReachUs);
app.post('/reachContact',Routes.saveReachUs);
app.get('/',Routes.index);

app.listen(3000);
console.log("server run on port:localhost:3000");
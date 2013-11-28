
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

app.get('/',Routes.index);
app.get('/our-services',Routes.service);
app.get('/the-company',Routes.company);
app.get('/our-portfolio',Routes.portfolio);
app.get('/testimonial',Routes.testimonial);
app.get('/why-outsource-to-us',Routes.outsource);
app.get('/reach-us',Routes.reachUs);
app.get('/outsource-to-india',Routes.outsourceIndia);
app.get('/offshore-development',Routes.offshoreDevelopment);
app.get('/solutions-technologies',Routes.solutionsTechnologies);
app.get('/Project-detail',Routes.ProjectDetail);
app.get('/case-Studies',Routes.caseStudies);
app.get('/partner-with-us',Routes.partnerWithUs);
app.get('/link',Routes.partnerWithUs);
app.get('/sitemap',Routes.sitemap);
app.get('/web-design',Routes.webdesign);
app.get('/web-development',Routes.webDevelopment);
app.get('/yahoo-store-design',Routes.yahooStore);
app.get('/ecommerce-solution',Routes.ecommerceSolution);
app.get('/software-development',Routes.softwareDevelopment);
app.get('/internet-marketing',Routes.internetMarketing);
app.get('/branding-identity',Routes.brandingIdentity);
app.get('/privacy-policy',Routes.privacyPolicy);
app.get('/disclaimer',Routes.disclaimer);

app.post('/form',Routes.form);
app.post('/reachContact',Routes.reachContact);

app.listen(3000);
console.log("server run on port:localhost:3000");
/*globals App*/
var env         = process.env.NODE_ENV || 'development',
    packageJson = require('./package.json'),
    express     = require('express');

console.log('Loading App in ' + env + ' mode');

global.App = {
  app: express(),
  name:packageJson.name,
  port: process.env.PORT || 3030,
  version: packageJson.version,
  root: process.cwd(),
  require: function(path){
    return require( this.root + path );
  },
  env: env,
  start:startServer,
  ub: (function(){ return require('./helpers/ub');})(),
  settings: (function(){ return require('./config/cmsSettings.json');})()
};


App.app.get('/', function(req, res){
  if (!req.user) {
    res.send('Welcome')
  }
})

App.app.use('/api', App.require('/routes/all'));

App.require('/config/db');


function startServer(){
  if (!this.started) {
    this.started = true;
    this.app.listen(this.port);
    console.log('Running App Version ' + App.version + ' on port ' + App.port + ' in ' + App.env + ' mode');
  }else{ console.log('Server is already running'); }
}
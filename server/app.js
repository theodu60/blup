/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var passport = require('passport');

// Setup server
var app = express();


var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app, passport);
require('./config/passport')(passport); // pass passport for configuration

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
    // process the signup form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


// Expose app
exports = module.exports = app;
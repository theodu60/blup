/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app, passport) {

  // Insert routes below
  app.use('/api/logins',  require('./api/login'));
  app.use('/api/buildCheckboxs', isLoggedIn, require('./api/buildCheckbox'));
  app.use('/api/getSousSegments', require('./api/getSousSegment'));
  app.use('/api/getSegments', require('./api/getSegment'));
  app.use('/api/getPrestataires', require('./api/getPrestataire'));
  app.use('/api/getPrestataire2s', require('./api/getPrestataire2'));
  app.use('/api/getPrestataire1s', require('./api/getPrestataire1'));
  app.use('/api/getMoiss', require('./api/getMois'));
  app.use('/api/getAnnees', require('./api/getAnnee'));
  app.use('/api/actionPlans', require('./api/actionPlan'));
  app.use('/api/buildCharts', require('./api/buildChart'));
  app.use('/api/getTimeLineSyntheses', require('./api/getTimeLineSynthese'));
  app.use('/api/getQuestions', require('./api/getQuestion'));
  app.use('/api/getEffectifs',  require('./api/getEffectif'));
  app.use('/api/lineCharts',  require('./api/lineChart'));
  app.use('/api/querys',  require('./api/query'));
  app.use('/api/things',  require('./api/thing'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });


    // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
      console.log("rreu")
        return next();
    }
    console.log("ok")
    // if they aren't redirect them to the home page
    res.redirect('/login');
}
};

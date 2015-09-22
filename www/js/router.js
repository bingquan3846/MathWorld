// Filename: router.js
define([
  'jquery',
  'jquerymobile',
  'underscore',
  'backbone',
  'models/profile/SessionModel',
  'views/tag/TagView',
  'views/ProfileView'

], function($,jm, _, Backbone, SessionModel, TagView, ProfileView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'home': 'showHome',
      'community': 'showCommunity',
      'profile'  : 'showProfile',
      
      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){

    var app_router = new AppRouter;


    $( document ).bind( "mobileinit", function() {
        // Make your jQuery Mobile framework configuration changes here!
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;

    });



    app_router.on('route:defaultAction', function (actions) {

      var tagView = new TagView("dog"  , '', 'tumblr');

      tagView.render();

      console.log('showHome');
    });

    app_router.on('route:showCommunity', function (actions) {

      console.log('showCommunity');
    });

    app_router.on('route:showProfile', function (actions) {

      var profileView = new ProfileView();

    });

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };

});

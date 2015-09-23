// Filename: router.js
define([
  'global',
  'jquery',
  'jquerymobile',
  'underscore',
  'backbone',
  'views/tag/TagView',
  'views/ProfileView',
  'views/global/LoginPageView'

], function(global, $,jm, _, Backbone, TagView, ProfileView, LoginPageView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'home': 'showHome',
      'community': 'showCommunity',
      'profile'  : 'showProfile',
      'login'    : 'showLogin',
      
      // Default
      '*actions': 'defaultAction'
    },
    initialize: function(options) {


    },

    defaultAction:function(){
      var tagView = new TagView("dog"  , '', 'tumblr');

      tagView.render();

      console.log('showHome');
    },
    showCommunity:function(){
      console.log('showCommunity');
    },
    showProfile:function(){
      console.log('showProfile');
    },
    showLogin:function(){
      var loginView = new LoginPageView();
      loginView.render();
    },
    execute: function(callback, args, name) {

      if(!global.session.get('logged_in')){
        this.navigate('/login');
        this.showLogin();
      }else{
        this.navigate('/');
      }
    },
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


    Backbone.history.start();
    app_router.execute();

  };

  return {
    initialize: initialize
  };

});

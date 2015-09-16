// Filename: router.js
define([
  'jquery',
  'jquerymobile',
  'underscore',
  'backbone',
  'views/tag/TagView'
], function($,jm, _, Backbone, TagView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'projects': 'showProjects',
      'users': 'showContributors',
      'tag'  : 'showTags',
      
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
    });

    var getChannel = function(){
        var channel;
        $('#nav-panel input').each(function(){
            if(this.checked){
              channel = $(this).attr('id');
            };
        });
        return channel;
    }
    showItems = function(){
      var tag = $( "#tag" ).val();
      var user = $( "#user" ).val();
      var channel = getChannel();
      showTagView(tag, user, channel);
      
    }
    $('#nav-panel input').click(function(){
        showItems();
    });
    $( "#tag" ).change(function() {
        showItems();
    });
    $( "#user " ).change(function() {
          showItems();
    });

    app_router.on('route:defaultAction', function (actions) {

         showTagView('dog','','facebook');
    });


    Backbone.history.start();
  };
  var showTagView = function(tag,user,channels){
      var tagView = new TagView(tag, user,channels);
      tagView.render();
  }
  return { 
    initialize: initialize
  };

});

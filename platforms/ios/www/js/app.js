// Filename: app.js
define([
    'jquery',
    'jquerymobile',
    'underscore',
    'backbone',
    'router', // Request router.js
], function($,jm, _, Backbone, Router){
    var app = {
        API : "/api"
    }
    var initialize = function(){
        // Pass in our Router module and call it's initialize function
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = true;

        $(document).on("pagebeforecreate",function(){
            $.mobile.loading('show');
        });
        $(document).on("pagecreate",function(){
            $.mobile.loading('hide');
        });

        Router.initialize();
    };

    return {
        initialize: initialize
    };
});

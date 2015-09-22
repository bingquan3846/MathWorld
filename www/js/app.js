// Filename: app.js
define([
    'jquery',
    'jquerymobile',
    'underscore',
    'backbone',
    'router', // Request router.js
], function($,jm, _, Backbone, Router){

    var app = {
        root : "http://localhost",                     // The root path to run the application through.
        URL : "http://localhost",                      // Base application URL
        API : "http://localhost/",                   // Base API URL (used by models & collections)

        // Show alert classes and hide after specified timeout

        initialize:function(){
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
        }
    };


    return app;
});

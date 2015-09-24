// Filename: app.js
define([
    'jquery',
    'jquerymobile',
    'underscore',
    'backbone'
], function($,jm, _, Backbone){

    var app = {

        // Show alert classes and hide after specified timeout

        initialize:function(){
            // Pass in our Router module and call it's initialize function
            //$.mobile.linkBindingEnabled = false;
            //$.mobile.hashListeningEnabled = true;

            $(document).on("pagebeforecreate",function(){
                $.mobile.loading('show');
            });
            $(document).on("pagecreate",function(){
                $.mobile.loading('hide');
            });
        }
    };


    return app;
});

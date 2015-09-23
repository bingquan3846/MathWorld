// Filename: global.js
if (typeof DEBUG === 'undefined') DEBUG = true;



define([
    'jquery',
    'jquerymobile',
    'underscore',
    'backbone',
], function($,jm, _, Backbone){

    var global ={
            root : "http://localhost",                     // The root path to run the application through.
            URL : "http://localhost",                      // Base application URL
            API : "http://localhost/",                // Base API URL (used by models & collections)

            // Show alert classes and hide after specified timeout
            showAlert: function(title, text, klass) {
                $("#header-alert").removeClass("alert-danger alert-warning alert-success alert-info");
                $("#header-alert").addClass(klass);
                $("#header-alert").html('<button class="close" data-dismiss="alert">×</button><strong>' + title + '</strong> ' + text);
                $("#header-alert").show('fast');
                setTimeout(function() {
                    $("#header-alert").hide();
                }, 7000 );
            }
        }


    return global;

});
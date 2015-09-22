define([
    'underscore',
    'backbone',
], function(_, Backbone) {

    var WeatherModel = Backbone.Model.extend({

        defaults : {
            longitude : "",
            latitude : ""
        },

        initialize: function( options ) {
            this.latitude  = options.latitude;
            this.longitude = options.longitude;
            console.log('http://api.openweathermap.org/data/2.5/weather?lat=' + this.latitude + '&lon=' + this.longitude);
        },

        url : function() {

            return 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.latitude + '&lon=' + this.longitude ;
        },

        parse : function(res) {
            // because of jsonp

            return res.response;
        }

    });

    return WeatherModel;

});

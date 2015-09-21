define([
    'jquery',
    'underscore',
    'backbone',
    '../models/global/WeatherModel',
    'text!templates/profile/profileTemplate.html',
], function($, _, Backbone, WeatherModel, profileTemplate){

    var ProfileView = Backbone.View.extend({
        el: $("#weather"),

        initialize: function() {
            var that = this;
            var options = {longitude:11.0257699 , latitude: 49.375511};


            var onDataHandler = function(collection) {
                that.render();
            }

            this.weatherModel = new WeatherModel(options);
            this.weatherModel.fetch({ success : onDataHandler, dataType: "jsonp"});

        },

        render: function(){


                var data = {
                    info: this.weatherModel.toJSON(),
                    _: _
                };
                console.debug(JSON.stringify(data));
                var compiledTemplate = _.template( profileTemplate, data );
                this.$el.html(compiledTemplate);
        }

    });

    return ProfileView;

});

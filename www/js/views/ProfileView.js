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


            this.weatherModel = new WeatherModel(options);
            this.weatherModel.fetch({ success: function(mod, res){

                that.renderWeather(res);
                console.log(res);
            }});

        },

        render: function(){


                var data = {
                    info: this.weatherModel.toJSON(),
                    _: _
                };
                //console.debug(JSON.stringify(data));

        },
        renderWeather :function(res){

            var data = {
                info : res,
                _:_
            }
            var compiledTemplate = _.template( profileTemplate, data );
            this.$el.html(compiledTemplate);
        }

    });

    return ProfileView;

});

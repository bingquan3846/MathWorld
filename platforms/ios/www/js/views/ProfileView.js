define([
    'global',
    'jquery',
    'underscore',
    'backbone',
    '../models/global/WeatherModel',
    'text!templates/profile/profileTemplate.html',
    'text!templates/profile/weatherTemplate.html',
], function(global,$, _, Backbone, WeatherModel, ProfileTemplate, WeatherTemplate){

    var ProfileView = Backbone.View.extend({
        el: $("#profile #content"),

        initialize: function() {
            var that = this;
            var options = {longitude:11.0257699 , latitude: 49.375511};


            this.weatherModel = new WeatherModel(options);
            this.weatherModel.fetch({ success: function(mod, res){
                that.render();
                that.renderWeather(res);
                console.log(res);
            }});

        },
        render: function(){

                var data = {
                    info: this.weatherModel.toJSON(),
                    _: _
                };
                var compiledTemplate = _.template( ProfileTemplate, data );

                this.$el.html(compiledTemplate);
                this.$el.find('#task').on('click',function(){global.redirect('task.html')});
                //console.debug(JSON.stringify(data));

        },
        renderWeather :function(res){

            var data = {
                info : res,
                _:_
            }
            var compiledTemplate = _.template( WeatherTemplate, data );

            this.$el.find('#weather').html(compiledTemplate);

        }

    });

    return ProfileView;

});

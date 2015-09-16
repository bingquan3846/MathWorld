define([
    'jquery',
    'underscore',
    'backbone',
    'models/global/WeatherModel',
    'text!templates/gloabl/tagTemplate.html'
], function($, _, Backbone, WeatherModel, tagTemplate){

    var TagView = Backbone.View.extend({
        el: $("#page"),

        initialize: function(keyword) {

            var that = this;
            var options = {query: keyword}


            var onDataHandler = function(collection) {
                that.render();
            }

            this.model = new TumblrModel(options);
            this.model.fetch({ success : onDataHandler, dataType: "jsonp"});

        },

        render: function(){

            var data = {
                posts: this.model.toJSON(),
                _: _
            };
            console.log(data);


            var compiledTemplate = _.template( tagTemplate, data );
            this.$el.html(compiledTemplate);
        }

    });

    return TagView;

});

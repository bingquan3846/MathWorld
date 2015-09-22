define([
    'jquery',
    'underscore',
    'backbone',
    'models/social/TumblrModel',
    'models/social/FacebookModel',
    'text!templates/tag/tagTemplate.html',
    'text!templates/tag/facebookTemplate.html'
], function($, _, Backbone, TumblrModel, FacebookModel, tagTemplate, facebookTemplate){

    var TagView = Backbone.View.extend({
        el: $("#listview"),

        initialize: function(keyword,user,channel) {

            var that = this;
            var channel;
            if(keyword == ''){
                keyword = 'dog';
            }
            var options = {query: keyword,blog:user}


            var onDataHandler = function(collection) {
                that.render();
            }
            if(channel == "tumblr"){ 
                this.channel = 'tumblr';              
                this.model = new TumblrModel(options);
                this.model.fetch({ success : onDataHandler, dataType: "jsonp"});
            }
            if(channel == "facebook"){
                this.channel = 'facebook';   
                this.model = new FacebookModel(options);
                this.model.fetch({ success : onDataHandler, dataType: "jsonp"});
            }
        },

        render: function(){

            if(this.channel == 'tumblr'){
                if(this.model.blog == ''){
                    var data = {
                        posts: this.model.toJSON(),
                        _: _
                    };
                }else{
                    var data = {
                        posts: this.model.toJSON().posts,
                    _: _
                    };
                }
                var compiledTemplate = _.template( tagTemplate, data );
                this.$el.html(compiledTemplate);
            }
            if(this.channel == 'facebook'){

                    var data = {
                        posts: this.model.toJSON(),
                    _: _
                    };
                    var compiledTemplate = _.template( facebookTemplate, data );
                    this.$el.html(compiledTemplate);
            }

        }

    });

    return TagView;

});

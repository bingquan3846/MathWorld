define([
    'jquery',
    'underscore',
    'backbone',
    '../models/profile/UserModel',
    'text!templates/profile/profileTemplate.html',
], function($, _, Backbone, UserModel, profileTemplate){

    var TagView = Backbone.View.extend({
        el: $("#content"),

        initialize: function() {

            var options = {username: 'northworld'}
            this.model = new UserModel(options);
            var onDataHandler = function(collection) {
                that.render();
            }
            $('#search').hide();
        },

        render: function(){
                var data = {
                    posts: this.model.toJSON().posts,
                    _: _
                };

                var compiledTemplate = _.template( profileTemplate, data );
                this.$el.html(compiledTemplate);
        }

    });

    return TagView;

});

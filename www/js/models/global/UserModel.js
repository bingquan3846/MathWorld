/**
 * @desc		stores the POST state and response state of authentication for user
 */
define([
    "global"
], function(global){

    var UserModel = Backbone.Model.extend({

        initialize: function(){
            _.bindAll(this);
        },

        defaults: {
            id: 0,
            username: '',
            name: '',
            email: ''
        },

        url: function(){
            return global.API + '/user';
        }

    });

    return UserModel;
});
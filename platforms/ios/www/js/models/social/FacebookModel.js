define([
    'underscore',
    'backbone',
], function(_, Backbone) {

    var FacebookModel = Backbone.Model.extend({

        defaults : {
            query : "unknown",
            blog  : "unknown"
        },

        initialize: function( options ) {
            this.query = options.query;
            this.blog  = options.blog;
        },

        url : function() {
            if(this.blog == ''){
                return 'https://graph.facebook.com/search?q=' + this.query + '&access_token=CAAFF4Xs8Wd0BAOMsVrNslbhIEb7P6tscOEmBI3hzVoEBbDlrCBscNXuVXfVx8vf2Jp8mLtZCtYWtZABzxr8hbcakBVXX3KNpV4POVUDLY4gXSQrPUrwU2U6lLpWJzEPB7LwzPegr8Hs5Fx3GZCtuLPpYhOQsu0Pu4CfZAMQSkCv7GGHtOGoC'; ;
            }else{
                //console.log('http://api.tumblr.com/v2/blog/'+ this.blog +'.tumblr.com/posts?api_key=FWLNCaW9vTiZtthwrlU75oQzuUxz8kwLfpJsEavQgvryGGlVb8');
                return 'https://graph.facebook.com/'+ this.blog +'/posts?access_token=CAAFF4Xs8Wd0BAOMsVrNslbhIEb7P6tscOEmBI3hzVoEBbDlrCBscNXuVXfVx8vf2Jp8mLtZCtYWtZABzxr8hbcakBVXX3KNpV4POVUDLY4gXSQrPUrwU2U6lLpWJzEPB7LwzPegr8Hs5Fx3GZCtuLPpYhOQsu0Pu4CfZAMQSkCv7GGHtOGoC';
            }

        },

        parse : function(res) {
            // because of jsonp

            return res.data;
        }

    });

    return FacebookModel;

});

define([
    "../../global",
    'jquery',
    'underscore',
    'backbone',
    "text!templates/global/logged-in-page.html",
    "text!templates/global/login-page.html",

    "../../libs/parsley"
], function(global, $ ,_ ,Backbone, LoggedInPageTpl, LoginPageTpl){

    var LoginView = Backbone.View.extend({

        el: $("#login #content"),


        initialize: function () {
            _.bindAll(this);

            // Listen for session logged_in state changes and re-render
            global.session.on("change:logged_in", this.render);
        },

        events: {
            'click #login-btn'                      : 'onLoginAttempt',
            'click #signup-btn'                     : 'onSignupAttempt',
            'keyup #login-password-input'           : 'onPasswordKeyup',
            'keyup #signup-password-confirm-input'  : 'onConfirmPasswordKeyup',
            //'click #start'                          :  global.redirect('#'),
        },

        // Allow enter press to trigger login
        onPasswordKeyup: function(evt){
            var k = evt.keyCode || evt.which;

            if (k == 13 && $('#login-password-input').val() === ''){
                evt.preventDefault();    // prevent enter-press submit when input is empty
            } else if(k == 13){
                evt.preventDefault();
                this.onLoginAttempt();
                return false;
            }
        },

        // Allow enter press to trigger signup
        onConfirmPasswordKeyup: function(evt){
            var k = evt.keyCode || evt.which;

            if (k == 13 && $('#confirm-password-input').val() === ''){
                evt.preventDefault();   // prevent enter-press submit when input is empty
            } else if(k == 13){
                evt.preventDefault();
                this.onSignupAttempt();
                return false;
            }
        },

        onLoginAttempt: function(evt){
            if(evt) evt.preventDefault();

            if(this.$("#login-form").parsley('validate')){
                global.session.login({
                    username: this.$("#login-username-input").val(),
                    password: this.$("#login-password-input").val()
                }, {
                    success: function(mod, res){
                        if(DEBUG) console.log("SUCCESS", mod, res);

                    },
                    error: function(err){
                        global.session.set({ logged_in : true });

                        if(DEBUG) console.log("ERROR", err);
                        global.showAlert('Bummer dude!', err.error, 'alert-danger'); 
                    }
                });
            } else {
                // Invalid clientside validations thru parsley
                if(DEBUG) console.log("Did not pass clientside validation");

            }
        },
        

        onSignupAttempt: function(evt){
            if(evt) evt.preventDefault();
            if(this.$("#signup-form").parsley('validate')){
                global.session.signup({
                    username: this.$("#signup-username-input").val(),
                    password: this.$("#signup-password-input").val(),
                    name: this.$("#signup-name-input").val()
                }, {
                    success: function(mod, res){
                        if(DEBUG) console.log("SUCCESS", mod, res);

                    },
                    error: function(err){
                        if(DEBUG) console.log("ERROR", err);
                        global.showAlert('Uh oh!', err.error, 'alert-danger'); 
                    }
                });
            } else {
                // Invalid clientside validations thru parsley
                if(DEBUG) console.log("Did not pass clientside validation");

            }
        },

        render:function () {
            if(global.session.get('logged_in')) this.template = _.template(LoggedInPageTpl);
            else this.template = _.template(LoginPageTpl); 

            this.$el.html(this.template({ user: global.session.user.toJSON() }));


            return this;
        }

    });

    return LoginView;
});


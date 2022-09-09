import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        signuppage: function(){
            this.transitionToRoute('signup');
        },

        loginpage: function(){
            this.transitionToRoute('login');

        }
    }
});

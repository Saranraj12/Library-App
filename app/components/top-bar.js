import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        backToHome: function(){
            this.sendAction('backToHome');
        },

        backToLogin: function(){
            this.sendAction('backToLogin');
        }
    }
});

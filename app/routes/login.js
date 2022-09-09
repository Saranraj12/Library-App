import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        if(sessionStorage.getItem('staff_id') != null){
            this.transitionTo('/staff/'+ sessionStorage.getItem('staff_id'));
        }
        else if(sessionStorage.getItem('reader_id') != null){
            this.transitionTo('/reader/' + sessionStorage.getItem('reader_id'));
        }
        else if(sessionStorage.getItem('publisher_id') != null){
            this.transitionTo('/publisher/' + sessionStorage.getItem('publisher_id'));
        }
        
    }
});

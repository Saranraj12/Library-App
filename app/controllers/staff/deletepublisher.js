import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        deletePublisher: function(){
            var id = $("#publisherid").val();
            $.ajax({
                url: 'http://localhost:8080/LibraryManagementSystem/v1/users?id='+id,
                method: 'DELETE',
                async: false,
                success: function(){},
                failure: function(){}
            });
            this.transitionToRoute('staff');
        },
        returnToPage: function(){
            this.transitionToRoute('staff');
        }
    }
});

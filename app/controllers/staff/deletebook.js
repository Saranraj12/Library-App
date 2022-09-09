import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
        deleteBook: function(){
            var id = $("#isbn").val();
            $.ajax({
                url: "http://localhost:8080/LibraryManagementSystem/v1/book?isbn="+id,
                method: 'DELETE',
                async: false,
                success: function(resultText){
                    console.log("Success ");
                },
                error: function(){
                    console.log("Something Occur wrongly");
                }
            });

            this.transitionToRoute('staff');
        },
        returnToPage: function(){
            this.transitionToRoute('staff');
        }
    }
});

import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {
        signUp:function(){
            console.log("1st print");
            var role = 2;
            if(document.getElementById("staff").checked){
                role = 0;
            }
            else if(document.getElementById("publisher").checked){
                role = 1;
            }
            console.log($('#firstname').val());
            $.ajax({
                url:'http://localhost:8080/LibraryManagementSystem/v1/users',
                method: 'POST',
                data: {"firstname":$('#firstname').val(),"lastname":$('#lastname').val(),"phone":$('#phone').val(),"email":$('#email').val(),"username":$('#username').val(),"password":$('#password ').val(),"role":role},
                async: false,
                success:function(responseText){
                    console.log(responseText);
                },
                error:function(jqXHR,exception){
                    console.log(jqXHR + exception);
                }

            });
            this.login();
        },
        
        backToLogin: function(){
            this.login();
        }
    },
    
    login(){
        this.transitionToRoute('login');

    }

});

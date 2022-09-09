import Ember from 'ember';

export default Ember.Controller.extend({
    
    actions: {
        login: function () {
            var data;
            var response = $.ajax({
                url: 'http://localhost:8080/LibraryManagementSystem/v1/login',
                method: 'POST',
                data: {"username": $('#username').val(),"password": $('#password').val()},
                async: false,
                success: function (resultText) {
                    return resultText;
                },
                error: function (jqXHR, exception) {
                    console.log('Error occured!!' + jqXHR + exception);
                }
            });
            if (response.responseText !== "null") {
                data = JSON.parse(response.responseText);
               
                if (data.role === 2) {
                    this.transitionToRoute('/reader/' + data.id);
                }
                else if (data.role === 1) {
                    this.transitionToRoute('/publisher/' + data.id);
                }
                else {
                    this.transitionToRoute('/staff/' + data.id);
                }
            }
            else {
                alert("Credentials Not Found");
            }
            this.set('data',data);
        },
        backToHome: function(){
        },

        backToLogin: function(){
            alert("Hello Logout");
        },
        backToSignup: function(){
            this.transitionToRoute('signup');
        }
    }
});

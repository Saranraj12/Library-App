import Ember from 'ember';

export default Ember.Controller.extend({

    controller: Ember.inject.controller('staff'),

    actions: {
        addBook: function(){

            console.log(this.get('controller.data'));

            var category = "novel";
            if($("#general").is(":checked")){
                category = "general";
            }
            else if($("#story").is(":checked")){
                category = "story";
            }

            // var d = {"booktitle": $("#booktitle").val(),"bookprice":$("#bookprice").val(),"edition":$("#edition").val(),"authorname":$("#authorname").val(),"category" : category,"issueinfo":$("#issueinfo").val(),"publisherid":$("#publisherid").val(),"publishedyear":$("#publishedyear").val()};
            // var obj = this.get('controller.data');
            // obj.push(d);

            // this.set('controller.data', obj);

            $.ajax({
                url: 'http://localhost:8080/LibraryManagementSystem/v1/book',
                method: 'POST',
                data: {"booktitle": $("#booktitle").val(),"bookprice":$("#bookprice").val(),"edition":$("#edition").val(),"authorname":$("#authorname").val(),"category" : category,"issueinfo":$("#issueinfo").val(),"publisherid":$("#publisherid").val(),"publishedyear":$("#publishedyear").val()},
                async: false,
                success: function (resultText) {
                    return resultText;
                },
                error: function (jqXHR, exception) {
                    console.log('Error occured!!' + jqXHR + exception);
                }
            });

            $("#result").text("Successfully added the Book");
            setTimeout(2000);
            this.transferToStaff();
        },
        backToHome: function(){
            console.log(this.get('controller.data'));
            this.transferToStaff();
        }
    },
    
    transferToStaff(){
        this.transitionToRoute('staff');

    }
});

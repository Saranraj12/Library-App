import Ember from 'ember';

export default Ember.Controller.extend({
    onInit:function() {
        this.set('title-head', "Book Catalogue");
    }.on('init'),

    actions: {

        backToHome: function(){
            this.transitionToRoute('reader');
        },

        backToLogin: function(){
            sessionStorage.clear();
            this.transitionToRoute('login');
        },
        
        clicked: function(){
            console.log(this.get('controller.data'));
            alert(this.get('controller.data').phone);
        },

        toggleConditionForReserve: function(param){
            if(param === 'true'){
                this.set('isReserve', true);
            }
            else{
                this.set('isReserve', false);
            }
        },

        toggleConditionForReturn: function(param){
            if(param === 'true'){
                this.set('isReturn', true);
            }
            else{
                this.set('isReturn', false);
            }
        },

        reserveBook: function(){
            var id = $("#isbn").val();
            console.log(this.get('rid'));
            console.log(id);
            var response = $.ajax({
                url: 'http://localhost:8080/LibraryManagementSystem/v1/users/reserve',
                method: 'POST',
                data:{"id": this.get('rid'),"isbn":id},
                async: false,
                success: function(){},
                failure: function(){}
            });
            console.log(response);
            alert(response.responseText === "success" ? "Reserved Successfully" : "Something gone Wrong Plz check it out");
            this.set('isReserve', false);
        },

        returnBook: function(){
            var id = $("#isbn").val();
            console.log(this.get('rid'));
            console.log(id);
            var response = $.ajax({
                url: 'http://localhost:8080/LibraryManagementSystem/v1/users/return',
                method: 'POST',
                data:{"id": this.get('rid'),"isbn":id},
                async: false,
                success: function(){},
                failure: function(){}
            });
            console.log(response);
            alert(response.responseText === "success" ? "Returned Successfully" : "Something gone Wrong Plz check it out");
            this.set('isReturn', false); 
        },
        validateBookId: function(){
            var idValue = $("#isbn").val();
            var values = this.get('data');
            var listOfIds = [];
            for(let value of values){
                listOfIds.push(value.isbn);
            }
            if(listOfIds.indexOf(parseInt(idValue))==-1){
                document.getElementById('result').innerText="enter the correct Book Id";
                document.getElementById('result').style.color = "red";
                document.getElementById('btn-reserve').disabled = true;
                
            }
            else{
                document.getElementById('btn-reserve').disabled = false;
                document.getElementById('result').innerText="";
            }
        },

        validateBookIdForReturn: function(){

            var idValue = $("#isbn").val();
            var values = this.get('reservedBooks');
            values = JSON.parse(values.responseText);
            var listOfIds = [];
            
            for(let value of values){
                listOfIds.push(value.isbn);
            }
            console.log(listOfIds);
            if(listOfIds.indexOf(parseInt(idValue))==-1){
                document.getElementById('result').innerText=" you haven't reserved this book";
                document.getElementById('result').style.color = "red";
                document.getElementById('btn-reserve').disabled = true;
            }
            else{
                document.getElementById('btn-reserve').disabled = false;
                document.getElementById('result').innerText="";
            }
        }
    },

});

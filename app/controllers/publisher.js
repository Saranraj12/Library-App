import Ember from 'ember';

export default Ember.Controller.extend({

    onInit:function() {
        
    }.on('init'),


    actions: {
        backToHome: function(){
            this.transitionToRoute('publisher');
        },

        backToLogin: function(){
            sessionStorage.clear();
            this.transitionToRoute('login');
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
            var response = $.ajax({
                url: 'http://localhost:8080/LibraryManagementSystem/v1/users/reserve?isbn='+id+'&id='+this.get('pid'),
                method: 'POST',
                async: false,
                success: function(){},
                failure: function(){}
            });

            alert(response.responseText === "success" ? "Reserved Successfully" : "Something gone Wrong Plz check it out");
            this.set('isReserve',false);
        },

        returnBook: function(){
            var id = $("#isbn").val();
            console.log(this.get('pid'));
            console.log(id);
            var response = $.ajax({
                url: 'http://localhost:8080/LibraryManagementSystem/v1/users/return',
                method: 'POST',
                data:{"id": this.get('pid'),"isbn":id},
                async: false,
                success: function(){},
                failure: function(){}
            });
            console.log(response);
            alert(response.responseText === "success" ? "Reserved Successfully" : "Something gone Wrong Plz check it out");
            this.set('isReturn', false);
        },

        showYourReaders: function(){
            var readers = $.ajax({
                url: 'http://localhost:8080/LibraryManagementSystem/v1/book/publisher/reader?publisherid='+ this.get('pid'),
                method: 'GET',
                async: false,
                success: function (resultText) {
                    return resultText;
                },
                error: function (jqXHR, exception) {
                    console.log('Error occured!!' + jqXHR + exception);
                }
            });
            if(readers.responseText.length > 0){

                readers = JSON.parse(readers.responseText);
                this.set('title-head', "Readers For Your Book");
                this.set('data', readers);
                
                var readers_list = Object.keys(readers[0]);
                var removed = ['username', 'password', 'role', 'isbanned', 'dueamount'];
                for (let value of removed) {
                    var index = readers_list.indexOf(value);
                    if (index !== -1) {
                        readers_list.splice(index, 1);
                    }
                }
                this.set('list', readers_list);
            }
            else{
                console.log("no readers found for your book");
            }
        },

        showYourBooks: function(){
            var readers = $.ajax({
                url: 'http://localhost:8080/LibraryManagementSystem/v1/book/publisher?publisherid='+ this.get('pid'),
                method: 'GET',
                async: false,
                success: function (resultText) {
                    return resultText;
                },
                error: function (jqXHR, exception) {
                    console.log('Error occured!!' + jqXHR + exception);
                }
            });
            if(readers.responseText.length > 0){

                readers = JSON.parse(readers.responseText);
                this.set('data', readers);
                this.set('title-head',"Your books");
                
                var readers_list = Object.keys(readers[0]);
                var removed = ['username', 'password', 'role', 'isbanned', 'dueamount', 'listofreaders','publisherid'];
                for (let value of removed) {
                    var index = readers_list.indexOf(value);
                    if (index !== -1) {
                        readers_list.splice(index, 1);
                    }
                }
                this.set('list', readers_list);
            }
            else{
                console.log("no readers found for your book");
            }
        },

        showBooks: function(){
            this.set('list',this.get('book_list'));
            this.set('data',this.get('books'));
            this.set("title-head","Book Catalogue");            
        },

        validateBookId: function(){
            var idValue = $("#isbn").val();
            var values = this.get('data');
            var listOfIds = [];
            console.log(this.get('pid'));
            for(let value of values){
                console.log(102 === parseInt(this.get('pid')));
                if(parseInt(value.publisherid) !== parseInt(this.get('pid'))){
                    listOfIds.push(value.isbn);
                }
            }
            if(listOfIds.indexOf(parseInt(idValue))==-1){
                document.getElementById('result').innerText="enter the correct Book Id or you can't reserve your books";
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
    }
});

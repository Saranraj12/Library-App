import Ember from 'ember';
import EmberResolver from 'ember-resolver';

export default Ember.Controller.extend({

    controller : Ember.inject.controller('staff'),

    onInit: function(){
        var bookid = this.get('controller.bookid');
        var data = $.ajax({
            url: "http://localhost:8080/LibraryManagementSystem/v1/book",
            method: 'GET',
            data: {"isbn" : bookid},
            async: false
        });
        if(data.responseText !== ""){
            data = JSON.parse(data.responseText);
            this.set("booktitle",data.booktitle);
            this.set("bookprice",data.bookprice);
            this.set("edition",data.edition);
            this.set("author",data.authorname);
            this.set("issueinfo",data.issueinfo);
            this.set("pid",data.publisherid);
            this.set("year",data.publishedyear);
        }
    }.on('init'),

    actions: {

        returnToPage: function(){
            this.set('isUpdateBook', false);
        },
        updateBook: function(){
            console.log(this.get('controller.bookid'));
            var str = "?isbn="+this.get('controller.bookid')+"&booktitle="+$("#booktitle").val()+"&bookprice="+$("#bookprice").val()+"&edition="+$("#edition").val()+"&authorname="+$("#authorname").val()+"&issueinfo="+$("#issueinfo").val()+"&publisherid="+$("#publisherid").val()+"&publishedyear="+$("#publishedyear").val()+"";
            $.ajax({
                url : "http://localhost:8080/LibraryManagementSystem/v1/book"+str,
                method: 'PUT',
                data: { "isbn" : this.get('controller.bookid'),"booktitle": $("#booktitle").val(),"bookprice":$("#bookprice").val(),"edition":$("#edition").val(),"authorname":$("#authorname").val(),"issueinfo":$("#issueinfo").val(),"publisherid":$("#publisherid").val(),"publishedyear":$("#publishedyear").val(),},
                async: false
            });
            this.transitionToRoute('staff');
        },
        backToHome: function(){
            console.log(this.get('controller.bookid'));
            this.transitionToRoute('staff');
        }
    }
});

import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel() {

        var books = $.ajax({
            url: 'http://localhost:8080/LibraryManagementSystem/v1/book',
            method: 'GET',
            async: false,
            success: function (resultText) {
                return resultText;
            },
            error: function (jqXHR, exception) {
                console.log('Error occured!!' + jqXHR + exception);
            }
        });
        var dat = JSON.parse(books.responseText);
        this.set('data', dat);
        var list = [];
        list = Object.keys(dat[0]);

        var index = list.indexOf('listofreaders');
        if (index != -1) {
            list.splice(index, 1);
        }
        this.set('list', list);
        
    },
    model(params){
        const {publisher_id} = params;
        return publisher_id;
    },

    afterModel(model) {
        console.log(model);
        var reservedbooks = $.ajax({
            url: 'http://localhost:8080/LibraryManagementSystem/v1/getreservedbooks',
            method: "GET",
            data: {"id": model},
            async: false
        });
        this.set('reservedBooks',reservedbooks);
    },
    
    setupController(controller) {

        controller.set('pid',this.get('currentModel'));
        controller.set('list', this.get('list'));
        controller.set('data', this.get('data'));
        controller.set('book_list', this.get('list'));
        controller.set('books', this.get('data'));
        controller.set('title-head', "Book Catalogue");
        controller.set('isReserve', false);
        controller.set('isReturn', false);
        controller.set('reservedBooks',this.get('reservedBooks'))
    },
});

import Ember from 'ember';

export default Ember.Route.extend({


    model(params) {

        const { staff_id } = params;
        this.set('staff_id', staff_id);
        sessionStorage.setItem('staff_id', staff_id);
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
        // console.log(books);
        var dat = JSON.parse(books.responseText);
        this.set('data', dat);
        var list = [];
        list = Object.keys(dat[0]);

        var index = list.indexOf('listofreaders');
        if (index != -1) {
            list.splice(index, 1);
        }
        this.set('list', list);

        return staff_id;
    },


    setupController: function (controller) {
        controller.set('data', this.get('data'));
        controller.set('list', this.get('list'));
        controller.set('books', this.get('data'));
        controller.set('book_list', this.get('list'));
        controller.set('isBooks', true);
        controller.set('title-head', "Book Catalogue");
    },
});

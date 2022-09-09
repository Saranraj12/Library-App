import Ember from 'ember';

export default Ember.Controller.extend({

    controller: Ember.inject.controller('login'),

    data: Ember.observer(function(){
        return "In data";
    }),

    actions: {

        backToHome: function () {
            this.transitionToRoute('staff');
        },

        backToLogin: function () {
            sessionStorage.clear();
            this.transitionToRoute('login');
            console.log("transistion done");
        },

        showReaders: function () {
            this.set("isBooks", false);
            this.set("isPublisher", false);
            console.log("reader clicked");
            this.set('isReaders', true);
            var readers = $.ajax({
                url: 'http://localhost:8080/LibraryManagementSystem/v1/users?role=2',
                method: 'GET',
                async: false,
                success: function (resultText) {
                    return resultText;
                },
                error: function (jqXHR, exception) {
                    console.log('Error occured!!' + jqXHR + exception);
                }
            });

            readers = JSON.parse(readers.responseText);
            this.set('data', readers);

            var readers_list = Object.keys(readers[0]);
            var removed = ['username', 'password', 'role', 'isbanned']
            for (let value of removed) {
                var index = readers_list.indexOf(value);
                if (index != -1) {
                    readers_list.splice(index, 1)
                }
            }
            this.set('list', readers_list);
            this.set('title-head', "Readers");
            console.log(this.get('list'));
        },

        showPublishers: function () {
            this.set("isBooks", false);
            this.set("isPublisher", true);
            var publishers = $.ajax({
                url: 'http://localhost:8080/LibraryManagementSystem/v1/users?role=1',
                method: 'GET',
                async: false,
                success: function (resultText) {
                    return resultText;
                },
                error: function (jqXHR, exception) {
                    console.log('Error occured!!' + jqXHR + exception);
                }
            });

            publishers = JSON.parse(publishers.responseText);

            var removed = ['username', 'password', 'isbanned', 'dueamount', 'role'];

            var publishers_list = Object.keys(publishers[0]);

            for (let value of removed) {
                var index = publishers_list.indexOf(value);
                if (index != -1) {
                    publishers_list.splice(index, 1)
                }
            }
            this.set('list', publishers_list);
            this.set('data', publishers);
            this.set('title-head', "Publishers");
        },

        showBooks: function () {
            this.set("isBooks", true);
            this.set("isPublisher", false);
            this.set('list', this.get('book_list'));
            this.set('data', this.get('books'));
            this.set('title-head', "Book Catalogue");
        },

        showBannedReaders: function () {
            this.set("isBooks", false);
            this.set("isPublisher", false);
            var bannedReaders = $.ajax({
                url: 'http://localhost:8080/LibraryManagementSystem/v1/users/bannedreaders',
                method: 'GET',
                async: false,
                success: function (resultText) {
                    return resultText;
                },
                error: function (jqXHR, exception) {
                    console.log('Error occured!!' + jqXHR + exception);
                }
            });
            bannedReaders = bannedReaders.responseText;
            if (bannedReaders != null) {
                console.log(bannedReaders);
                bannedReaders = JSON.parse(bannedReaders);
                var readers_list = Object.keys(bannedReaders[0]);
                var removed = ['username', 'password', 'role', 'isbanned'];
                for (let value of removed) {
                    var index = readers_list.indexOf(value);
                    if (index != -1) {
                        readers_list.splice(index, 1);
                    }
                }
                this.set('list', readers_list);
                this.set('data', bannedReaders);
                this.set('title-head', "Banned Readers");
            }
        },

        showReport: function () {
            this.set("isPublisher", false);
            this.set("isBooks", false);
            var reports = $.ajax({
                url: 'http://localhost:8080/LibraryManagementSystem/v1/report',
                method: 'GET',
                async: false,
                success: function (resultText) {
                    return resultText;
                },
                error: function (jqXHR, exception) {
                    console.log('Error occured!!' + jqXHR + exception);
                }
            });

            if (reports.responseText != null) {
                reports = JSON.parse(reports.responseText);
                console.log(reports);
                var reports_list = Object.keys(reports[0]);
            }

            this.set('list', reports_list);
            this.set('data', reports);
            this.set('title-head', "Reports");

        },
        add: function () {
            this.transitionToRoute('staff.addbook');
        },
        delete: function (params) {
            if (params === 'book') {
                this.transitionToRoute('staff.deletebook');
            }
            else {
                this.transitionToRoute('staff.deletepublisher');
            }
        },

        update: function () {
            this.set('isUpdateBook',true);
        },
        returnToPage: function(){
            this.set('isUpdateBook', false);
        },
        updatebook: function(){
            this.set('bookid',parseInt($('#isbn').val()))
            this.transitionToRoute('staff.update')
        },
        backToHome: function(){
            this.transitionToRoute('staff');
        }
    }
});

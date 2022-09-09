import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('staff', { path: '/staff/:staff_id' }, function() {
    this.route('addbook');
    this.route('deletebook');
    this.route('deletepublisher');
    this.route('update');
  });
  this.route('publisher', { path: '/publisher/:publisher_id' }, function() {});
  this.route('reader', { path: '/reader/:reader_id' }, function() {});
});

export default Router;

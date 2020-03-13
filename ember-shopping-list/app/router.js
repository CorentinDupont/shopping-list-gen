import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  
  this.route('item', function() {});
  this.route('item/create');
  this.route('user/create');
  this.route('login');
  this.route('protected');
  this.route('token');
  this.route('logout');
  this.route('register');
});

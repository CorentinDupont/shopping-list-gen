import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);

// new Pretender(function () {
//   this.get('/items', () => {
//     let all = JSON.stringify(items);
//     console.log(all);
//     return [200, {
//       "Content-Type": "application/json"
//     }, all]
//   }),
//   this.post('/items', () => {
//     let all = JSON.stringify(items);
//     console.log(all);
//     return [200, {
//       "Content-Type": "application/json"
//     }, all]
//   })
// });

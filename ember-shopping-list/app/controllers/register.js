import Controller from '@ember/controller';
import EmberObject, { action } from '@ember/object';
import Application from '@ember/application';

export default class RegisterController extends Controller {

    @action
    async accountCreation(){
        let { identification, password  } = this.getProperties('identification', 'password');
        // let session = getOwner(this).lookup('service:session');
        // await session.
        let App = Application.create();
        App.user = EmberObject.extend();
        App.session = EmberObject.create();

        App.register('model:user', App.Person, { singleton: false });
        App.register('session', App.session, { instantiate: false });
    }
}

import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
    name() {
        return faker.lorem.word();
    },

    price() {
    return faker.random.number();
    },
});

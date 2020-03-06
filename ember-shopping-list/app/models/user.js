import DS from '@ember-data/model';

export default DS.Model.extend({
    username: DS.attr('string'),
    password: DS.attr('string')
})

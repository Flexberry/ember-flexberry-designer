import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    this.get('store').pushPayload({
      data: {
        prototypeBy: undefined,
        name: 'Some name',
        type: undefined,
        isNull: false,
        defaultValue: undefined
      }
    });

    let store = this.get('store');
    return store.createRecord('fd-visual-edit-control', {});
  }
});

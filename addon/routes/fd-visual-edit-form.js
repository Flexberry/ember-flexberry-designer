import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    this.get('store').pushPayload({
      data: {
          id: 1,
          name: 'Some name',
          description: 'Description',
          components: {}
      }
    });

    let store = this.get('store');
    return store.createRecord('fd-visual-edit-form', {});
  }
});

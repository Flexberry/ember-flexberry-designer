import Ember from 'ember';

export default Ember.Route.extend({
  model(control) {
    let store = this.get('store');
    return store.find('fd-visual-edit-control', control);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
  },
});

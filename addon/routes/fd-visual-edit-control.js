import Route from '@ember/routing/route';

export default Route.extend({
  model(control) {
    let store = this.get('store');
    return store.find('fd-visual-edit-control', control);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
  },
});

import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let store = this.get('store');

    let fdControlModel = store.createRecord('fd-visual-edit-control',
    {
      id: 1,
      name: 'Some control',
      defaultValue: 'Default',
    });

    let editFormModel = store.createRecord('fd-visual-edit-form',
    {
      id: 1,
      name: 'Some name',
      description: 'Description',
    });

    editFormModel.get('controls').pushObject(fdControlModel);
    return editFormModel;
  },

  setupController: function(controller, model) {
    this._super(controller, model);
  },
});

import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let store = this.get('store');

    let fdControlModel = store.createRecord('fd-visual-edit-control',
    {
      id: Ember.generateGuid(fdControlModel),
      isSelected: true,
      name: 'Some control',
      notNullable: true,
    });

    let editFormModel = store.createRecord('fd-visual-edit-form',
    {
      id: Ember.generateGuid(editFormModel),
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

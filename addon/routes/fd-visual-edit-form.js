import Ember from 'ember';

export default Ember.Route.extend({

  formId: null,

  classId: null,

  beforeModel: function(params) {
    this.formId = params.queryParams.formId;
    this.classId = params.queryParams.classId;
  },

  model() {
    let store = this.get('store');

    let fdControlModel = store.createRecord('fd-visual-edit-control',
    {
      isSelected: true,
      name: 'Some control',
      notNullable: true,
    });

    let editFormModel = store.createRecord('fd-visual-edit-form',
    {
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

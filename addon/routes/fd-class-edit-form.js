import EditFormRoute from 'ember-flexberry/routes/edit-form';

export default EditFormRoute.extend({
  modelProjection: 'FdEditClassForm',
  modelName: 'fd-dev-class',

  afterModel: function(model) {
    this._super(model);

    if (!model.get('caption')) {
      model.set('caption', model.get('name'));
    }

    if (model.get('stereotype') === '«enumeration»') {
      this.transitionTo('fd-enum-edit-form', model);
    }
  },
});

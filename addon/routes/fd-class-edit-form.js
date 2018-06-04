import Ember from 'ember';
import EditFormRoute from 'ember-flexberry/routes/edit-form';

export default EditFormRoute.extend({
  modelProjection: 'FdEditClassForm',
  modelName: 'fd-dev-class',

  setupController: function(controller, model) {
    if (!model.get('caption')) {
      model.set('caption', model.get('name'));
    }

    this.send('setClass', model.get('id'));
    this._super(controller, model);
  },

  willDestroy: function() {
    this.send('setClass', undefined);
    this._super(...arguments);
  }
});

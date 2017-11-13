import Ember from 'ember';
import EditFormRoute from 'ember-flexberry/routes/edit-form';

export default EditFormRoute.extend({
  modelProjection: 'FdEditClassForm',
  modelName: 'fd-dev-class',

  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: Ember.inject.service('fd-current-project-context'),

  setupController: function(controller, model) {
    if (!model.get('caption')) {
      model.set('caption', model.get('name'));
    }

    this.get('currentContext').setCurrentClass(model);
    this._super(controller, model);
  },

  willDestroy: function() {
    this.get('currentContext').setCurrentClass(undefined);
    this.super(...arguments);
  }
});

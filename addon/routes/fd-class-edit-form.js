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

  actions: {
    /**
      This action is called when check class on class-form.
      Transition to view-form with classId parameter.

      @method actions.gotoView
      @public
    */
    gotoView() {
      let classId = this.controller.model.get('id');
      this.transitionTo('fd-view-list-form', { queryParams: { classId: classId } });
    }
  },

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

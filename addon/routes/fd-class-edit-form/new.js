import { inject as service } from '@ember/service';
import EditFormNewRoute from 'ember-flexberry/routes/edit-form-new';

export default EditFormNewRoute.extend({
  modelProjection: 'FdEditClassForm',
  modelName: 'fd-dev-class',
  templateName: 'fd-class-edit-form',

  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: service('fd-current-project-context'),

  /**
    A hook you can use to setup the controller for the current route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_setupController).

    @method setupController
    @param {Ember.Controller} controller
    @param {Object} model
   */
  setupController(controller, model) {
    let stage = this.get('currentContext').getCurrentStageModel();
    model.set('stage', stage);
    this._super(...arguments);
    controller.set('readonlyClass', false);
  }
});

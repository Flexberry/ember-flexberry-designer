import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import EditFormNewRoute from 'ember-flexberry/routes/edit-form-new';

export default EditFormNewRoute.extend({
  modelProjection: 'EditFormView',
  modelName: 'fd-dev-association',
  templateName: 'fd-association-edit-form',

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
    A hook you can use to setup the controller for the current route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_setupController).

    @method setupController
    @param {Ember.Controller} controller
    @param {Object} model
   */
  setupController: function(controller) {
    this._super(...arguments);
    let currentStage = this.get('currentProjectContext').getCurrentStageModel();

    // Get current classes.
    let allClasses = this.get('store').peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', currentStage.id);
    let implementations = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«implementation»' || item.get('stereotype') === null;
    });

    let implementationsName = A(implementations).map(i => i.get('name') || i.get('nameStr'));
    controller.set('implementations', implementations);
    controller.set('implementationsName', implementationsName);
    controller.set('startClassName', '');
    controller.set('endClassName', '');
    controller.set('readonlyClass', false);
    controller.set('model.stage', currentStage);
  }
});

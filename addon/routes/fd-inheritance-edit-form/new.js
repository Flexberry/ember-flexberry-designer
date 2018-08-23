import Ember from 'ember';
import EditFormNewRoute from 'ember-flexberry/routes/edit-form-new';

export default EditFormNewRoute.extend({
  modelProjection: 'EditFormView',
  modelName: 'fd-dev-inheritance',
  templateName: 'fd-inheritance-edit-form',

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
   */
  currentProjectContext: Ember.inject.service('fd-current-project-context'),

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
      return item.get('stereotype') !== '«application»' && item.get('stereotype') !== '«enumeration»';
    });

    let implementationsName = Ember.A(implementations).map(i => i.get('name') || i.get('nameStr'));
    controller.set('implementations', implementations);
    controller.set('parentNames', implementationsName);
    controller.set('childNames', implementationsName);
    controller.set('parentName', '');
    controller.set('childName', '');
    controller.set('readonlyDropdown', false);
    controller.set('model.stage', currentStage);
  }
});

import Ember from 'ember';
import EditFormRoute from 'ember-flexberry/routes/edit-form';
import FdLoadingForTransitionMixin from '../mixins/fd-loading-for-transition';

export default EditFormRoute.extend(FdLoadingForTransitionMixin, {
  modelProjection: 'EditFormView',
  modelName: 'fd-dev-inheritance',

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
  setupController: function(controller, model) {
    this._super(...arguments);
    let stagePk = this.get('currentProjectContext').getCurrentStage();

    // Get current classes.
    let allClasses = this.get('store').peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', stagePk);
    let implementations = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') !== '«application»' && item.get('stereotype') !== '«enumeration»';
    });

    let implementationsName = Ember.A(implementations).mapBy('name');
    controller.set('parentNames', implementationsName);
    controller.set('childNames', implementationsName);
    controller.set('parentName', model.get('parent.name'));
    controller.set('childName', model.get('child.name'));
    controller.set('readonlyDropdown', true);
  }
});

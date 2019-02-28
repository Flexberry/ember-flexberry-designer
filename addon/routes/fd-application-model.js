import Ember from 'ember';
import FdFormCheckTransitionMixin from '../mixins/fd-form-check-transition';

export default Ember.Route.extend(FdFormCheckTransitionMixin, {

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
   */
  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  /**
    A hook you can implement to convert the URL into the model for this route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_model).

    @method model
   */
  model: function() {
    let modelHash = {
      classes: Ember.A(),
      typedefs: undefined,
      enums: undefined,
      types: undefined
    };

    let store = this.get('store');
    let stage = this.get('currentProjectContext').getCurrentStageModel();

    // Get current classes.
    let allClasses = store.peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', stage.get('id'));

    // null or «implementation»
    let implementations = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«implementation»' || item.get('stereotype') === null;
    });

    // «listform», «editform»
    let forms = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«listform»' || item.get('stereotype') === '«editform»';
    });

    // Classes.
    implementations.forEach((implementation) => {
      let classForms = forms.filter((form) => {
        let idParent = form.get('formViews').mapBy('view.class.id');
        if (idParent[0] === implementation.id) {
          return form;
        }
      });

      modelHash.classes.pushObject({
        settings: implementation,
        forms: Ember.A(classForms)
      });
    });

    // Typedef.
    let typedefs = classesCurrentStage.filterBy('stereotype', '«typedef»');
    modelHash.typedefs = Ember.A(typedefs);

    // Enums.
    let enums = classesCurrentStage.filterBy('stereotype', '«enumeration»');
    modelHash.enums = Ember.A(enums);

    // Types.
    let types = classesCurrentStage.filterBy('stereotype', '«type»');
    modelHash.types = Ember.A(types);

    return modelHash;
  },

  /**
    A hook you can use to setup the controller for the current route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_setupController).

    @method setupController
    @param {Ember.Controller} controller
    @param {Object} model
   */
  setupController(controller, model) {
    this._super(...arguments);
    controller.set('originalModel', model);
  },
});

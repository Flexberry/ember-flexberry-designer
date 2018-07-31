import Ember from 'ember';

import { copyViewDefinition } from '../utils/fd-copy-view-definition';

export default Ember.Route.extend({

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  actions: {
    /**
      See [EmberJS API](https://emberjs.com/).

      @method actions.didTransition
    */
    didTransition() {
      Ember.$('.full.height').on('click.fd-editform-constructor', () => {
        this.get('controller').send('selectItem');
      });
    },
  },

  queryParams: {
    classId: { refreshModel: true },
  },

  model: function(params) {
    let modelHash = {
      editform: undefined,
      originalDefinition: undefined,
      dataobject: undefined,
      classes: undefined,
      aggregations: undefined,
      stage: undefined,
    };

    let store = this.get('store');

    modelHash.stage = this.get('currentProjectContext').getCurrentStageModel();
    modelHash.classes = store.peekAll('fd-dev-class');
    modelHash.aggregations = store.peekAll('fd-dev-aggregation');

    // Editform.
    let editform = store.peekRecord('fd-dev-class', params.id);
    if (!editform.get('caption')) {
      editform.set('caption', editform.get('name'));
    }

    modelHash.editform = editform;

    // Dataobject.
    let dataobjectId = editform.get('formViews.firstObject.view.class.id');
    modelHash.dataobject = store.peekRecord('fd-dev-class', dataobjectId);

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

    model.originalDefinition = copyViewDefinition(model.editform.get('formViews.firstObject.view.definition'));

    controller.set('selectedItem', undefined);
    controller.set('_showNotUsedAttributesTree', false);
    controller.set('state', '');
  },

  /**
    A hook you can use to reset controller values either when the model changes or the route is exiting.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_resetController).

    @method resetController
    @param {Ember.Controller} controller
    @param {Boolean} isExisting
    @param {Object} transition
   */
  resetController(controller, isExiting) {
    this._super(...arguments);

    if (isExiting) {
      Ember.$('.full.height').off('click.fd-editform-constructor');
    }

    let store = this.get('store');
    store.peekAll('fd-dev-class').forEach((item) => item.rollbackAll());
    store.peekAll('fd-dev-stage').forEach((item) => item.rollbackAll());
    store.peekAll('fd-dev-association').forEach((item) => item.rollbackAll());
    store.peekAll('fd-dev-aggregation').forEach((item) => item.rollbackAll());
    let definition = controller.get('model.editform.formViews.firstObject.view.definition');
    definition.clear();
    definition.pushObjects(controller.get('model.originalDefinition'));
  },
});

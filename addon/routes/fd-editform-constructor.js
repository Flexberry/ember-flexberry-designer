import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { get } from '@ember/object';
import { isNone } from '@ember/utils';
import { copyViewDefinition } from '../utils/fd-copy-view-definition';
import FdFormCheckTransitionMixin from '../mixins/fd-form-check-transition';

export default Route.extend(FdFormCheckTransitionMixin, {

  currentProjectContext: service('fd-current-project-context'),

  actions: {
    /**
      See [EmberJS API](https://emberjs.com/).

      @method actions.didTransition
    */
    didTransition() {
      $('.full.height').on('click.fd-editform-constructor', (e) => {
        let path = get(e, 'originalEvent.path') || [];
        let editRow = path.find((element) => $(element).hasClass('fd-editform-row'));
        if (isNone(editRow)) {
          this.get('controller').send('selectItem');
        }
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
      views: undefined,
      inheritances: undefined,
      associations: undefined,
      aggregations: undefined,
      stage: undefined,
    };

    let store = this.get('store');

    modelHash.stage = this.get('currentProjectContext').getCurrentStageModel();

    let allClassesInStore = store.peekAll('fd-dev-class');
    let allViewsInStore = store.peekAll('fd-dev-view');
    let allInheritancesInStore = store.peekAll('fd-dev-inheritance');
    let allAssociationsInStore = store.peekAll('fd-dev-association');
    let allAggregationsInStore = store.peekAll('fd-dev-aggregation');

    modelHash.classes = allClassesInStore.filterBy('stage.id', modelHash.stage.get('id'));
    modelHash.views = allViewsInStore.filter(function(item) {
      return !isNone(modelHash.classes.findBy('id', item.get('class.id')));
    });
    modelHash.inheritances = allInheritancesInStore.filterBy('stage.id', modelHash.stage.get('id'));
    modelHash.associations = allAssociationsInStore.filterBy('stage.id', modelHash.stage.get('id'));
    modelHash.aggregations = allAggregationsInStore.filterBy('stage.id', modelHash.stage.get('id'));

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
      $('.full.height').off('click.fd-editform-constructor');
    }

    controller.clearFormData();
  },
});

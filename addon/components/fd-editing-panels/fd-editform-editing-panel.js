import Component from '@ember/component';
import FdUpdateFormviewValueMixin from '../../mixins/fd-editing-panels/fd-update-formview-value';
import FdReadonlyModeMixin from '../../mixins/fd-editing-panels/fd-readonly-mode';
import FdConstructorValue from '../../mixins/fd-editing-panels/fd-constructor-value';
import layout from '../../templates/components/fd-editing-panels/fd-editform-editing-panel';
import { isNone } from '@ember/utils';

export default Component.extend(FdUpdateFormviewValueMixin, FdConstructorValue, FdReadonlyModeMixin, {
  layout,

  /**
    Form data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Class data.

    @property dataobject
    @type Object
    @default undefined
  */
  dataobject: undefined,

  /**
    Get model for constructor.

     @method getConstructorModel
     @param {Object} store Store.
     @param {Object} stage Current stage.
  */
  getConstructorModel(store, stage) {
    let modelHash = {
      editform: undefined,
      dataobject: undefined,
      classes: undefined,
      views: undefined,
      inheritances: undefined,
      associations: undefined,
      aggregations: undefined,
      stage: undefined,
    };

    modelHash.stage = stage;

    let allClassesInStore = store.peekAll('fd-dev-class');
    let allViewsInStore = store.peekAll('fd-dev-view');
    let allInheritancesInStore = store.peekAll('fd-dev-inheritance');
    let allAssociationsInStore = store.peekAll('fd-dev-association');
    let allAggregationsInStore = store.peekAll('fd-dev-aggregation');

    modelHash.classes = allClassesInStore.filterBy('stage.id', stage.get('id'));
    modelHash.views = allViewsInStore.filter(function(item) {
      return !isNone(modelHash.classes.findBy('id', item.get('class.id')));
    });
    modelHash.inheritances = allInheritancesInStore.filterBy('stage.id', stage.get('id'));
    modelHash.associations = allAssociationsInStore.filterBy('stage.id', stage.get('id'));
    modelHash.aggregations = allAggregationsInStore.filterBy('stage.id', stage.get('id'));
    modelHash.editform = this.get('model');

    // Dataobject.
    let dataobjectId = modelHash.editform.get('formViews.firstObject.view.class.id');
    modelHash.dataobject = store.peekRecord('fd-dev-class', dataobjectId);

    return modelHash;
  }
});

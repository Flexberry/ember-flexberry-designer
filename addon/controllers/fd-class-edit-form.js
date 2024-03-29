import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import { SimplePredicate, ComplexPredicate } from 'ember-flexberry-data/query/predicate';
import Condition from 'ember-flexberry-data/query/condition';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';
import BusinessDataObjectEvents from 'ember-flexberry-designer/enums/i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events';
import { updateClassOnDiagram } from '../utils/fd-update-class-diagram';

export default EditFormController.extend({
  parentRoute: 'fd-class-list-form',

  header: computed.readOnly('model.name'),

  currentContext: service('fd-current-project-context'),

  /**
    Flag: indicates whether to edit class name.

    @property readonlyClass
    @type Boolean
    @default true
   */
  readonlyClass: true,

  getCellComponent(attr, bindingPath, model) {
    let cellComponent = this._super(...arguments);
    if (attr.kind === 'belongsTo') {
      switch (`${model.modelName}+${bindingPath}`) {
        case 'fd-class-storage-type+storageType':
          cellComponent.componentProperties = {
            choose: 'showLookupDialog',
            remove: 'removeLookupValue',
            displayAttributeName: 'shortName',
            required: true,
            relationName: 'storageType',
            projection: 'ListFormView',
            dropdown: true,
            dropdownIsSearch: false,
            sorting: 'desc',
            direction: 'downward'
          };
          break;

      }
    }

    return cellComponent;
  },

  /**
    Current predicate to limit accessible values for lookup with '«businessserver»' stereotype.
    @property lookupStereotypeLimitPredicate
    @type SimplePredicate
   */
  lookupStereotypeLimitPredicate: computed(function() {
    let stagePk = this.get('currentContext').get('context.stage');
    let stagePredicate = new SimplePredicate('stage', FilterOperator.Eq, stagePk);
    let stereotypePredicate = new SimplePredicate('stereotype', FilterOperator.Eq, '«businessserver»');
    return new ComplexPredicate(Condition.And, stagePredicate, stereotypePredicate);
  }),

  /**
    Overridden method 'Save'.
  */
  save() {
    let _this = this;
    let model = this.get('model');
    if (isNone(model.get('nameStr'))) {
      model.set('nameStr', model.get('name'));
    }

    let attributes = model.get('attributes').toArray();
    let attributesStrArray = attributes.map(function(item) {
      let accessModifier = item.get('accessModifier') || '+';
      return accessModifier + item.get('name') + ':' + item.get('type');
    });
    let attributesStr = attributesStrArray.join('\n');
    model.set('attributesStr', attributesStr);

    let methods = model.get('methods').toArray();
    let methodsStrArray = methods.map(function(item) {
      return item.get('accessModifier') + item.get('name') + '():' + item.get('type');
    });
    let methodsStr = methodsStrArray.join('\n');
    model.set('methodsStr', methodsStr);

    this._super(...arguments).then(() => {
      updateClassOnDiagram.call(_this, _this.get('store'), _this.get('model'));
    });
  },

  actions: {
    /**
      Overridden action for button 'Save'.
      @method actions.save
    */
    save() {
      this._setModelProperties();
      this._setDefaultBusinessServerEvents();
      this._super();
    },

    /**
      Overridden action for button 'Save and close'.
      @method actions.saveAndClose
      @param {Boolean} skipTransition If `true`, then transition during close form process will be skipped after save.
    */
    saveAndClose(skipTransition) {
      this._setModelProperties();
      this._setDefaultBusinessServerEvents();
      this._super(skipTransition);
    },

    /**
      Overridden action for 'Close' button.

      @method actions.close
    */
    close() {
      history.back();
    },
  },

  /**
    Sets 'businessServerEvents' model property value to default if business server is not present.
    @method _setDefaultBusinessServerEvents
    @private
  */
  _setDefaultBusinessServerEvents() {
    if (!this.get('model.businessServerClass') &&
        this.get('model.businessServerEvents') !== BusinessDataObjectEvents.OnAllEvents) {
      this.set('model.businessServerEvents', BusinessDataObjectEvents.OnAllEvents);
    }
  },

  /**
    Sets properties of model that don't set explicitly on eidt form.
    @method _setModelProperties
    @private
  */
  _setModelProperties() {
    let name = this.get('model.name');
    this.set('model.nameStr', name);
  }
});

import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import { Query } from 'ember-flexberry-data';
import BusinessDataObjectEvents from 'ember-flexberry-designer/enums/i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events';
import { updateClassOnDiagram } from '../utils/fd-update-class-diagram';

const { SimplePredicate, FilterOperator, ComplexPredicate, Condition } = Query;

export default EditFormController.extend({
  parentRoute: 'fd-class-list-form',

  header: Ember.computed.readOnly('model.name'),

  currentContext: Ember.inject.service('fd-current-project-context'),

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
  lookupStereotypeLimitPredicate: Ember.computed(function() {
    let stagePk = this.get('currentContext').get('context.stage');
    let stagePredicate = new SimplePredicate('stage', FilterOperator.Eq, stagePk);
    let stereotypePredicate = new SimplePredicate('stereotype', FilterOperator.Eq, '«businessserver»');
    return new ComplexPredicate(Condition.And, stagePredicate, stereotypePredicate);
  }),

  /**
    Overridden metod 'Save'.
  */
  save() {
    let _this = this;
    let model = this.get('model');
    if (Ember.isNone(model.get('nameStr'))) {
      model.set('nameStr', model.get('name'));
    }

    let attributes = model.get('attributes').toArray();
    let attributesStrArray = attributes.map(function(item) {
      let accessModifier = item.get('accessModifier') || '+';
      return accessModifier + item.get('name') +':' + item.get('type');
    });
    let attributesStr = attributesStrArray.join('\n');
    model.set('attributesStr', attributesStr);

    let methods = model.get('methods').toArray();
    let methodsStrArray = methods.map(function(item) {
      return item.get('accessModifier') + item.get('name') +'():' + item.get('type');
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
      this._setDefaultBusinessServerEvents();
      this._super();
    },

    /**
      Overridden action for button 'Save and close'.
      @method actions.saveAndClose
      @param {Boolean} skipTransition If `true`, then transition during close form process will be skipped after save.
    */
    saveAndClose(skipTransition) {
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
  */
  _setDefaultBusinessServerEvents() {
    if (!this.model.get('businessServerClass') &&
        this.model.get('businessServerEvents') !== BusinessDataObjectEvents.OnAllEvents) {
      this.model.set('businessServerEvents', BusinessDataObjectEvents.OnAllEvents);
    }
  }
});

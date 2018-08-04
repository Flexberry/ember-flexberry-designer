import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import { Query } from 'ember-flexberry-data';
import BusinessDataObjectEvents from 'ember-flexberry-designer/enums/i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events';

const { SimplePredicate, FilterOperator, ComplexPredicate, Condition } = Query;

export default EditFormController.extend({
  parentRoute: 'fd-class-list-form',

  currentContext: Ember.inject.service('fd-current-project-context'),

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
      this.set('state', 'loading');
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

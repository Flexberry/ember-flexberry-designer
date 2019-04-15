import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import FdClassExternalStoreInstancesInType from '../../objects/fd-storeinstancesintype';

/**
  Mixin with the support `store instances in type table` for controls in the edit form constructor.

  @class FdUpdateStoreInstancesValueMixin
  @uses <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Table headers for 'store instances in type'.

    @property tableViewForStoreInstancesInType
    @type Array
  */
  tableViewForStoreInstancesInType: [
    {
      columnCaption: 'components.fd-attribute-table.store-instances.data',
      columnProperty: 'data',
      attrPlaceholder: 'components.fd-attribute-table.store-instances.data-placeholder',
      columnClass: 'three'
    },
    {
      columnCaption: 'components.fd-attribute-table.store-instances.ds',
      columnProperty: 'dataService',
      attrPlaceholder: 'components.fd-attribute-table.store-instances.ds-placeholder',
      columnClass: 'four'
    },
  ],

  /**
    Button locale path for 'store instances in type'.

    @property storeInstancesInTypeButton
    @type Object
  */
  storeInstancesInTypeButton: {
    createBtn: 'components.fd-attribute-table.store-instances.create-btn',
    deleteBtn: 'components.fd-attribute-table.store-instances.delete-btn',
  },

  actions: {

    /**
      Method create 'store instances in type' from table.

      @method actions.createStoreInstancesInType
    */
    createStoreInstancesInType() {
      let storeInstances = this.get('model.storeInstancesInTypeXML');
      storeInstances.pushObject(FdClassExternalStoreInstancesInType.create());
    },

    /**
      Method remove 'store instances in type' from table.

      @method actions.createStoreInstancesInType
    */
    deleteStoreInstancesInType(selectedValues) {
      let storeInstances = this.get('model.storeInstancesInTypeXML');
      storeInstances.removeObjects(selectedValues);
    }
  }
});

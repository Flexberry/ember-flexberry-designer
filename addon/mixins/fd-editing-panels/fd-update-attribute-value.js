import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import RepositoryAccessModifier  from '../../enums/s-t-o-r-m-c-a-s-e-repository-access-modifier';

/**
  Mixin with the support `Attribute table` for controls in the edit form constructor.

  @class FdUpdateAttributeValueMixin
  @uses <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({

  /**
    Store of current application.

    @property store
    @type DS.Store or subclass
  */
  store: service(),

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Table headers for attribute.

    @property tableViewAttribute
    @type Array
  */
  tableViewAttribute: computed('isExpanded' , function() {
    let tableViewAttribute = A([{
      columnCaption: 'components.fd-attribute-table.attribute.name',
      columnProperty: 'name',
      attrPlaceholder: 'components.fd-attribute-table.attribute.name-placeholder',
    },
    {
      columnCaption: 'components.fd-attribute-table.attribute.caption',
      columnProperty: 'caption',
      attrPlaceholder: 'components.fd-attribute-table.attribute.caption-placeholder',
    },
    {
      columnCaption: 'components.fd-attribute-table.attribute.type',
      columnProperty: 'type',
      attrPlaceholder: 'components.fd-attribute-table.attribute.type-placeholder',
    },
    {
      columnCaption: 'components.fd-attribute-table.attribute.not-null',
      columnProperty: 'notNull',
      isCheckBox: true,
    }]);

    if (this.get('isExpanded')) {
      tableViewAttribute.push({
          columnCaption: 'components.fd-attribute-table.attribute.default-value',
          columnProperty: 'defaultValue',
          attrPlaceholder: 'components.fd-attribute-table.attribute.default-value-placeholder',
        },
        {
          columnCaption: 'components.fd-attribute-table.attribute.description',
          columnProperty: 'description',
          attrPlaceholder: 'components.fd-attribute-table.attribute.description-placeholder',
          isTextArea: true,
        },
        {
          columnCaption: 'components.fd-attribute-table.attribute.stored',
          columnProperty: 'stored',
          isCheckBox: true,
        },
        {
          columnCaption: 'components.fd-attribute-table.attribute.storage',
          columnProperty: 'storage',
          attrPlaceholder: 'components.fd-attribute-table.attribute.storage-placeholder',
        },
        {
          columnCaption: 'components.fd-attribute-table.attribute.dataServiceExpression',
          columnProperty: 'dataServiceExpression',
          attrPlaceholder: 'components.fd-attribute-table.attribute.dataServiceExpression-placeholder',
          isDataServiceExpression: true,
        },
        {
          columnCaption: 'components.fd-attribute-table.attribute.autoincrement',
          columnProperty: 'autoincrement',
          isCheckBox: true,
        }
      )
    }

    return tableViewAttribute;
  }),

  isExpanded: computed('fdSheetService.sheetSettings.expanded.{class-sheet,edit-diagram-object-sheet}', function() {
    let sheetComponentName = this.get('targetObject.sheetComponentName');
    return this.get(`fdSheetService.sheetSettings.expanded.${sheetComponentName}`);
  }),

  /**
    Button locale path for attribute.

    @property attributeButton
    @type Object
  */
  attributeButton: {
    createBtn: 'components.fd-attribute-table.attribute.create-btn',
    deleteBtn: 'components.fd-attribute-table.attribute.delete-btn',
  },

  attributeTableCaption: 'components.fd-attribute-table.attribute.table-caption',

  actions: {

    /**
      Method create attribute from table.

      @method actions.createAttribute
    */
    createAttribute() {
      let store = this.get('store');
      let model = this.get('model');
      store.createRecord('fd-dev-attribute', {
        class: model,
        stored: true,
        accessModifier: RepositoryAccessModifier.Public
      });
    },

    /**
      Method edit view.

      @method actions.createView
    */
    editAttribute() {
      let sheetComponentName = this.get('targetObject.sheetComponentName');
      this.get('fdSheetService').expand(sheetComponentName);
    },
  }
});

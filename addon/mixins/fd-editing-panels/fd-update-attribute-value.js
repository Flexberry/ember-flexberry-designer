import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
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
    Table headers for attribute.

    @property tableViewAttribute
    @type Array
  */
  tableViewAttribute: [
    {
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
    },
    {
      columnCaption: 'components.fd-attribute-table.attribute.default-value',
      columnProperty: 'defaultValue',
      attrPlaceholder: 'components.fd-attribute-table.attribute.default-value-placeholder',
    },
    {
      columnCaption: 'components.fd-attribute-table.attribute.description',
      columnProperty: 'description',
      attrPlaceholder: 'components.fd-attribute-table.attribute.description-placeholder',
    }
  ],

  /**
    Button locale path for attribute.

    @property attributeButton
    @type Object
  */
  attributeButton: {
    createBtn: 'components.fd-attribute-table.attribute.create-btn',
    deleteBtn: 'components.fd-attribute-table.attribute.delete-btn',
  },

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
    }
  }
});

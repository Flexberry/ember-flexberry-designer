import Ember from 'ember';

/**
  Mixin with the support `Attribute table` for controls in the edit form constructor.

  @class FdUpdateAttributeValueMixin
  @uses <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({

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
      columnClass: 'three'
    },
    {
      columnCaption: 'components.fd-attribute-table.attribute.caption',
      columnProperty: 'caption',
      attrPlaceholder: 'components.fd-attribute-table.attribute.caption-placeholder',
      columnClass: 'four'
    },
    {
      columnCaption: 'components.fd-attribute-table.attribute.type',
      columnProperty: 'type',
      attrPlaceholder: 'components.fd-attribute-table.attribute.type-placeholder',
      columnClass: 'four'
    },
    {
      columnCaption: 'components.fd-attribute-table.attribute.description',
      columnProperty: 'description',
      attrPlaceholder: 'components.fd-attribute-table.attribute.description-placeholder',
      columnClass: 'four'
    },
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
        class: model
      });
    }
  }
});

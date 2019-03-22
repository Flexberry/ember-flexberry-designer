import Ember from 'ember';

export default Ember.Mixin.create({

  /**
    Table headers for method.

    @property tableViewMethods
    @type Array
  */
  tableViewMethods: [
    {
      columnCaption: 'components.fd-attribute-table.methods.name',
      columnProperty: 'name',
      attrPlaceholder: 'components.fd-attribute-table.methods.name-placeholder',
      columnClass: 'three'
    },
    {
      columnCaption: 'components.fd-attribute-table.methods.caption',
      columnProperty: 'caption',
      attrPlaceholder: 'components.fd-attribute-table.methods.caption-placeholder',
      columnClass: 'four'
    },
    {
      columnCaption: 'components.fd-attribute-table.methods.type',
      columnProperty: 'type',
      attrPlaceholder: 'components.fd-attribute-table.methods.type-placeholder',
      columnClass: 'four'
    },
    {
      columnCaption: 'components.fd-attribute-table.methods.description',
      columnProperty: 'description',
      attrPlaceholder: 'components.fd-attribute-table.methods.description-placeholder',
      columnClass: 'four'
    },
  ],

  /**
    Button locale path for methods.

    @property methodsButton
    @type Array
  */
  methodsButton: {
    createBtn: 'components.fd-attribute-table.methods.create-btn',
    deleteBtn: 'components.fd-attribute-table.methods.delete-btn',
  },

  actions: {

    /**
      Method create method from table.

      @method createMethod
    */
    createMethod() {
      let store = this.get('store');
      let model = this.get('model');
      store.createRecord('fd-dev-method', {
        class: model
      });
    }
  }
});

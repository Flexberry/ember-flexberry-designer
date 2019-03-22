import Ember from 'ember';

export default Ember.Mixin.create({

  /**
    Table headers for view.

    @property tableViewForView
    @type Array
  */
  tableViewForView: [
    {
      columnCaption: 'components.fd-attribute-table.view.name',
      columnProperty: 'name',
      attrPlaceholder: 'components.fd-attribute-table.view.name-placeholder',
      columnClass: 'three'
    },
    {
      columnCaption: 'components.fd-attribute-table.view.description',
      columnProperty: 'description',
      attrPlaceholder: 'components.fd-attribute-table.view.description-placeholder',
      columnClass: 'four'
    },
  ],

  /**
    Button locale path for view.

    @property viewButton
    @type Array
  */
  viewButton: {
    createBtn: 'components.fd-attribute-table.view.create-btn',
    deleteBtn: 'components.fd-attribute-table.view.delete-btn',
  },

  actions: {

    /**
      Method create view from table.

      @method createView
    */
    createView() {

    }
  }
});

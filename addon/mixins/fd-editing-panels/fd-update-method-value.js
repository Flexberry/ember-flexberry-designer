import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import RepositoryAccessModifier  from '../../enums/s-t-o-r-m-c-a-s-e-repository-access-modifier';

/**
  Mixin with the support `Method table` for controls in the edit form constructor.

  @class FdUpdateMethodeValueMixin
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
    Table headers for method.

    @property tableViewMethods
    @type Array
  */
  tableViewMethods: [
    {
      columnCaption: 'components.fd-attribute-table.methods.name',
      columnProperty: 'name',
      attrPlaceholder: 'components.fd-attribute-table.methods.name-placeholder',
    },
    {
      columnCaption: 'components.fd-attribute-table.methods.caption',
      columnProperty: 'caption',
      attrPlaceholder: 'components.fd-attribute-table.methods.caption-placeholder',
    },
    {
      columnCaption: 'components.fd-attribute-table.methods.type',
      columnProperty: 'type',
      attrPlaceholder: 'components.fd-attribute-table.methods.type-placeholder',
    },
    {
      columnCaption: 'components.fd-attribute-table.methods.description',
      columnProperty: 'description',
      attrPlaceholder: 'components.fd-attribute-table.methods.description-placeholder',
    },
  ],

  /**
    Button locale path for methods.

    @property methodsButton
    @type Object
  */
  methodsButton: {
    createBtn: 'components.fd-attribute-table.methods.create-btn',
    deleteBtn: 'components.fd-attribute-table.methods.delete-btn',
  },

  methodsTableCaption: 'components.fd-attribute-table.methods.table-caption',

  actions: {

    /**
      Method create method from table.

      @method actions.createMethod
    */
    createMethod() {
      let store = this.get('store');
      let model = this.get('model');
      store.createRecord('fd-dev-method', {
        class: model,
        accessModifier: RepositoryAccessModifier.Public
      });
    }
  }
});

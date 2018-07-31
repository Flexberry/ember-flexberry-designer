import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';

export default EditFormController.extend({
  parentRoute: 'fd-inheritance-list-form',

  /**
    Array all classes.

    @property implementations
    @type Array
    @default []
   */
  implementations: Ember.A(),

  /**
      Array name parent classes.

    @property parentName
    @type Array
    @default []
   */
  parentName: Ember.A(),

  /**
      Array name child classes.

    @property childName
    @type Array
    @default []
   */
  childName: Ember.A(),

  /**
    Flag: indicates whether to edit dropdowns.

    @property readonlyDropdown
    @type Boolean
    @default true
   */
  readonlyDropdown: true,

  actions: {

    /**
      Set 'Parent'.

      @method actions.changeParent
    */
    changeParent(value) {
      if (!this.get('readonlyDropdown')) {
        let parent = this.get('implementations').findBy('name', value);
        let model = this.get('model');
        Ember.set(model, 'parent', parent);

        let newChild = this._getNewItems(value);
        this.set('childName', newChild);
      }
    },

    /**
      Set 'Child'.

      @method actions.changeChild
    */
    changeChild(value) {
      if (!this.get('readonlyDropdown')) {
        let child = this.get('implementations').findBy('name', value);
        let model = this.get('model');
        Ember.set(model, 'child', child);

        let newParent = this._getNewItems(value);
        this.set('parentName', newParent);
      }
    }
  },

  /**
    Create new items for dropdown.

    @method _getNewItems
  */
  _getNewItems(value) {
    let newItems = this.get('implementations').filter(function(item) {
      return item.get('name') !== value;
    });

    return Ember.A(newItems).mapBy('name');
  }
});

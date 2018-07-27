import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';

export default EditFormController.extend({
  parentRoute: 'fd-association-list-form',

  /**
    Array all classes.

    @property implementations
    @type Array
    @default []
   */
  implementations: Ember.A(),

  /**
      Array name all classes.

    @property implementationsName
    @type Array
    @default []
   */
  implementationsName: Ember.A(),

  /**
    Flag: indicates whether to edit classes.

    @property readonlyClass
    @type Boolean
    @default true
   */
  readonlyClass: true,

  /**
    Array of access modifiers for the master property.

    @property itemsAccessModifier
    @type Array
    @default ['+', '-', '#']
   */
  itemsAccessModifier: ['+', '-', '#'],

  actions: {

    /**
      Set 'startClass'.

      @method actions.changeStartClass
    */
    changeStartClass(value) {
      if (!this.get('readonlyClass')) {
        let startClass = this.get('implementations').findBy('name', value);
        let model = this.get('model');
        Ember.set(model, 'startClass', startClass);
      }
    },

    /**
      Set 'endClass'.

      @method actions.changeEndClass
    */
    changeEndClass(value) {
      if (!this.get('readonlyClass')) {
        let endClass = this.get('implementations').findBy('name', value);
        let model = this.get('model');
        Ember.set(model, 'endClass', endClass);
      }
    }
  }
});

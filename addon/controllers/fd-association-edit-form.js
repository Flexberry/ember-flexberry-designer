import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';

export default EditFormController.extend({
  parentRoute: 'fd-association-list-form',

  /**
    @private
    @property _showConfirmDialog
    @type Boolean
    @default false
  */
  _showConfirmDialog: false,

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
      Name start class.

    @property startClassName
    @type String
    @default ''
   */
  startClassName: '',

  /**
      Name end class.

    @property endClassName
    @type String
    @default ''
   */
  endClassName: '',

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
        Ember.set(this, 'startClassName', startClass.get('name'));
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
        Ember.set(this, 'endClassName', endClass.get('name'));
      }
    },

    /**
      Confirm close form with unsaved attributes.

      @method actions.confirmCloseUnsavedFormAction
    */
    confirmCloseUnsavedFormAction() {
      this.send('confirmCloseUnsavedForm');
    }
  },

  /**
    Check if fields changed, but unsaved

    @method findUnsavedFields
  */
  findUnsavedFields: function () {
    let checkResult = false;
    let modelChanges = this.get('model').changedAttributes();

    if (Ember.keys(modelChanges).length > 0) {
      for (var key in modelChanges) {
        let argumentBefore = modelChanges[key][0];
        let argumentAfter = modelChanges[key][1];
        if (!Ember.isEmpty(argumentBefore) || !Ember.isEmpty(argumentAfter)) {
          if (!Ember.isEqual(argumentBefore, argumentAfter)) {
            checkResult = true;
          }
        }
      }
    }

    return checkResult;
  }
});

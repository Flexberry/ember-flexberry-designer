import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';

export default EditFormController.extend(FdFormUnsavedData, {
  parentRoute: 'fd-aggregation-list-form',

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
   */
  currentProjectContext: Ember.inject.service('fd-current-project-context'),

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
    Name end class.

    @property endClassName
    @type String
    @default ''
   */
  endClassName: '',

  /**
    Name start class.

    @property startClassName
    @type String
    @default ''
   */
  startClassName: '',

  /**
    Flag: indicates whether to edit classes.

    @property readonlyClass
    @type Boolean
    @default true
   */
  readonlyClass: true,

  actions: {
    /**
      Set 'startClass'.

      @method actions.changeStartClass
    */
    changeStartClass(value) {
      if (!this.get('readonlyClass')) {
        let startClass = this.get('implementations').find(i => i.get('name') === value || i.get('nameStr') === value);
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
        let endClass = this.get('implementations').find(i => i.get('name') === value || i.get('nameStr') === value);
        let model = this.get('model');
        Ember.set(model, 'endClass', endClass);
        Ember.set(this, 'endClassName', endClass.get('name'));
      }
    }
  }
});

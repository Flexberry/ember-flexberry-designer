import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import { updateAggregationOnDiagram } from '../utils/fd-update-class-diagram';

export default EditFormController.extend({
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

  /**
    Overridden metod 'Save'.
  */
  save() {
    let _this = this;
    this._super(...arguments).then(() => {
      updateAggregationOnDiagram.call(_this, _this.get('store'), _this.get('model'));
    });
  },

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
        if (Ember.isNone(model.get('startRole')) || model.get('startRole') === '') {
          Ember.set(model, 'startRole', startClass.get('name'));
        }
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
        if (Ember.isNone(model.get('endRole')) || model.get('endRole') === '') {
          Ember.set(model, 'endRole', endClass.get('name'));
        }
      }
    },
  }
});

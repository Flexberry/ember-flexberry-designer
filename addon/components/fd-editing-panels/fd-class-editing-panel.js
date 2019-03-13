import Ember from 'ember';
import layout from '../../templates/components/fd-editing-panels/fd-class-editing-panel';

export default Ember.Component.extend({
  layout,

  /**
    Store of current application.

    @property store
    @type DS.Store or subclass
  */
  store: Ember.inject.service('store'),

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
   */
  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Businessserver arrays.

    @property bsItems
    @type Object
    @default undefined
  */
  bsItems: undefined,

  /**
    Businessserver name.

    @property bsValue
    @type string
    @default undefined
  */
  bsValue: undefined,

  /**
    Ember.observer, watching string `model.name` and update 'bsValue' property.

    @method _modelObserver
  */
  _modelObserver: Ember.on('init', Ember.observer('model.name', function() {
    let bsName = this.get('model.businessServerClass.name') || '';
    this.set('bsValue', bsName);
  })),

  init() {
    this._super(...arguments);
    let store = this.get('store');
    let stagePk = this.get('currentProjectContext').getCurrentStage();

    // Get current classes.
    let allClasses = store.peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', stagePk);
    let bs = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«businessserver»' && !Ember.isBlank(item.get('name'));
    });

    let bsEmberA = Ember.A(bs);
    let bsNames = bsEmberA.mapBy('name');
    bsNames.push('');

    this.set('bsItems', {
      names: bsNames,
      objects: bsEmberA,
    });
  },

  actions: {

    /**
      Update 'businessServerClass'.

      @method actions.changeBsValue
      @param {Object} value An object with a new value in the `value` property.
    */
    changeBsValue(value) {
      let model = this.get('model');
      if (Ember.isBlank(value)) {
        Ember.set(model, 'businessServerClass', null);
      } else {
        let bsItems = this.get('bsItems');
        let bsObject = bsItems.objects.filterBy('name', value);
        Ember.set(model, 'businessServerClass', bsObject[0]);
      }
    }
  }
});

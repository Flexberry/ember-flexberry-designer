import Ember from 'ember';

/**
  Mixin with the support `Choice BS` for controls in the edit form constructor.

  @class FdUpdateBsValueMixin
  @uses <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({
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
    let bs = allClasses.filter(function(item) {
      return item.get('stereotype') === '«businessserver»' && !Ember.isBlank(item.get('name')) && item.get('stage.id') === stagePk;
    });

    let bsEmberA = Ember.A(bs);
    let bsNames = bsEmberA.mapBy('name');
    bsNames.unshift('');

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
        let bsObject = bsItems.objects.findBy('name', value);
        Ember.set(model, 'businessServerClass', bsObject);
      }
    }
  }
});

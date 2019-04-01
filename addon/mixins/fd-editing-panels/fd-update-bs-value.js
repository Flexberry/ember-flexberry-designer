import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { on } from '@ember/object/evented';
import { observer, set } from '@ember/object';
import { isBlank } from '@ember/utils';
import { A } from '@ember/array';

/**
  Mixin with the support `Choice BS` for controls in the edit form constructor.

  @class FdUpdateBsValueMixin
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
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
   */
  currentProjectContext: service('fd-current-project-context'),

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
  _modelObserver: on('init', observer('model.name', function() {
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
      return item.get('stereotype') === '«businessserver»' && !isBlank(item.get('name')) && item.get('stage.id') === stagePk;
    });

    let bsEmberA = A(bs);
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
      if (isBlank(value)) {
        set(model, 'businessServerClass', null);
      } else {
        let bsItems = this.get('bsItems');
        let bsObject = bsItems.objects.findBy('name', value);
        set(model, 'businessServerClass', bsObject);
      }
    }
  }
});

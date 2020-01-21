import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Mixin.create({

  /**
    @property store
    @type Service
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
    Flag: indicates whether to show constructor panel.

    @property isConstructor
    @type Bool
    @default false
  */
  isConstructor: false,

  /**
    Return model for constructor

     @method constructorModel
  */
  constructorModel: computed('model', function() {
    let store = this.get('store');
    let stage = this.get('currentProjectContext').getCurrentStageModel();
    let modelHash = this.getConstructorModel(store, stage);

    return modelHash;
  }),

  /**
    Get model for constructor.

     @method getConstructorModel
     @param {Object} store Store.
     @param {Object} stage Current stage.
  */
  getConstructorModel() {
    assert(`Please specify 'getConstructorModel' method`);
  },

  didInsertElement() {
    this._super(...arguments);

    this.set('isConstructor', false);
  },

  actions: {

    /**
      Сhanges view of the component.

       @method actions.switchBetweenSettings
    */
    switchBetweenSettings() {
      this.set('isConstructor', !this.get('isConstructor'));
    }
  }
});

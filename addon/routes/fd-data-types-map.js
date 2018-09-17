/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import FdFormCheckTransitionMixin from '../mixins/fd-form-check-transition';

/**
  Route for the edit form of the type map.

  @class FdDataTypesMapRoute
  @extends <a href="http://emberjs.com/api/classes/Ember.Route.html">Ember.Route</a>
*/
export default Ember.Route.extend(FdFormCheckTransitionMixin, {
  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: Ember.inject.service('fd-current-project-context'),

  /**
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: Ember.inject.service(),

  actions: {
    /**
      See [EmberJS API](https://emberjs.com/).

      @method actions.didTransition
    */
    didTransition() {
      Ember.run.next(() => {
        this.set('controller.showTypeMap', true);

        // Save the type map if it has just been generated with default values.
        if (this.get('controller').findUnsavedFormData()) {
          this.get('controller').send('save');
        } else {
          this.get('appState').reset();
        }
      });
    }
  },

  /**
    See [EmberJS API](https://emberjs.com/).

    @method model
  */
  model() {
    this.get('appState').loading();
    return {
      stage: this.get('currentContext').getCurrentStageModel(),
      classes: this.get('store').peekAll('fd-dev-class'),
    };
  },

  /**
    See [EmberJS API](https://emberjs.com/).

    @method model
  */
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('showTypeMap', false);
    }
  },
});

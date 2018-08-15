/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Route for the edit form of the type map.

  @class FdDataTypesMapRoute
  @extends <a href="http://emberjs.com/api/classes/Ember.Route.html">Ember.Route</a>
*/
export default Ember.Route.extend({
  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: Ember.inject.service('fd-current-project-context'),

  actions: {
    /**
      See [EmberJS API](https://emberjs.com/).

      @method didTransition
    */
    didTransition() {
      // Save the type map if it has just been generated with default values.
      if (this.get('controller').serializeTypeMap()) {
        this.get('controller').send('save');
      }
    },

    /**
      See [EmberJS API](https://emberjs.com/).

      @method willTransition
    */
    willTransition(transition) {
      let controller = this.get('controller');
      if (controller.serializeTypeMap()) {
        this.send('showModalDialog', 'modal/save', { controller });
        transition.abort();
      }
    },
  },

  /**
    See [EmberJS API](https://emberjs.com/).

    @method model
  */
  model() {
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
      controller.set('showTypeMap', true);
    }
  },
});

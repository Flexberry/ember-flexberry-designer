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

  /**
    Service for controlling the load indication.

    @property objectlistviewEvents
    @type ObjectlistviewEvents
  */
  objectlistviewEvents: Ember.inject.service('objectlistview-events'),

  actions: {
    /**
      See [EmberJS API](https://emberjs.com/).

      @method actions.didTransition
    */
    didTransition() {
      Ember.run.next(() => {
        this.set('controller.showTypeMap', true);

        // Save the type map if it has just been generated with default values.
        if (this.get('controller').serializeTypeMap()) {
          this.get('controller').send('save');
        } else {
          this.get('objectlistviewEvents').setLoadingState('');
        }
      });
    },

    /**
      See [EmberJS API](https://emberjs.com/).

      @method actions.willTransition
    */
    willTransition(transition) {
      let controller = this.get('controller');
      if (controller.serializeTypeMap()) {
        this.send('showModalDialog', 'modal/save', { controller });
        controller.set('abortedTransition', transition);
        transition.abort();
      }
    },
  },

  /**
    See [EmberJS API](https://emberjs.com/).

    @method model
  */
  model() {
    this.get('objectlistviewEvents').setLoadingState('loading');
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

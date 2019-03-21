/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  Parent route for all forms of generation.

  @class FdGenerationRoute
  @extends Ember.Route
*/
export default Ember.Route.extend({
  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}{{/crossLink}}.

    @property projectContext
    @type FdCurrentProjectContextService
  */
  projectContext: Ember.inject.service('fd-current-project-context'),

  actions: {
    /**
      Starts generation, opens its log when it starts successfully.

      @method actions.generate
    */
    generate() {
      let adapter = this.get('store').adapterFor('application');
      let project = this.get('projectContext').getCurrentStage();

      adapter.callFunction('Generate', { project }).then((result) => {
        this.transitionTo('fd-generation.log', result.value);
      });
    },
  },
});

/**
  @module ember-flexberry-designer
*/

import Route from '@ember/routing/route';

/**
  The route for the form with a list of all generations.

  @class FdGenerationListRoute
  @extends Ember.Route
*/
export default Route.extend({
  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method model
  */
  model() {
    return this.modelFor('fd-generation');
  },
});

/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  The route for the form with a list of all generations.

  @class FdGenerationListRoute
  @extends Ember.Route
*/
export default Ember.Route.extend({
  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method model
  */
  model() {
    return this.modelFor('fd-generation');
  },
});

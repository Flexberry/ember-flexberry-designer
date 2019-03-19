/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  The controller for the form with a list of all generations.

  @class FdGenerationIndexController
  @extends Ember.Controller
*/
export default Ember.Controller.extend({
  actions: {
    /**
      Starts a new generation of the current project.

      @method actions.generate
    */
    generate() {
      throw new Error('Not implemented.');
    },
  },
});

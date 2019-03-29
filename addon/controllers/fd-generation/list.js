/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  The route for the form with a list of all generations.

  @class FdGenerationListController
  @extends Ember.Controller
*/
export default Ember.Controller.extend({
  /**
    The name of the sheet with the generation log.

    @property sheetName
    @type String
    @default 'GenerationLogSheet'
  */
  sheetName: 'GenerationLogSheet',
});

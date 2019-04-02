/**
  @module ember-flexberry-designer
*/

import Controller from '@ember/controller';

/**
  The route for the form with a list of all generations.

  @class FdGenerationListController
  @extends Ember.Controller
*/
export default Controller.extend({
  /**
    The name of the sheet with the generation log.

    @property sheetName
    @type String
    @default 'GenerationLogSheet'
  */
  sheetName: 'GenerationLogSheet',
});

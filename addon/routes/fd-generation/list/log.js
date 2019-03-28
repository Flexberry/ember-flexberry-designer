/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import { Query } from 'ember-flexberry-data';

const { Builder } = Query;

/**
  The route for the form with a log of generation.

  @class FdGenerationListLogRoute
  @extends Ember.Route
*/
export default Ember.Route.extend({
  /**
    Link to {{#crossLink "FdSheetService"}}{{/crossLink}}.

    @property sheetService
    @type Ember.Service
  */
  sheetService: Ember.inject.service('fd-sheet-service'),

  actions: {
    /**
      See [EmberJS API](https://emberjs.com/api/).

      @method actions.didTransition
    */
    didTransition() {
      let { sheetService, controller } = this.getProperties('controller', 'sheetService');

      sheetService.on('closeSheetTriggered', this, this._onCloseSheet);
      sheetService.openSheet(controller.get('sheetName'));

      if (controller.get('generation.isRunning')) {
        controller.updateLog();
      }
    },

    /**
      See [EmberJS API](https://emberjs.com/api/).

      @method actions.willTransition
      @param {Object} transition
    */
    willTransition(transition) {
      let { sheetService, controller } = this.getProperties('controller', 'sheetService');

      sheetService.off('closeSheetTriggered', this, this._onCloseSheet);
      if (transition.targetName !== 'fd-generation.list.log') {
        sheetService.closeSheet(controller.get('sheetName'));
      }

      controller.stopUpdate();
    },
  },

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method model
  */
  model(params) {
    let store = this.get('store');
    let modelName = 'fd-generation';
    let projectionName = 'EditFormView';

    let builder = new Builder(store)
      .from(modelName)
      .selectByProjection(projectionName)
      .byId(params.generation_id);

    return Ember.RSVP.hash({
      generation: store.queryRecord(modelName, builder.build()),
    });
  },

  /**
    Called when the sheet with the generation log is closed.

    @private
    @method _onCloseSheet
    @param {String} sheetName The name of the sheet that is closing.
  */
  _onCloseSheet(sheetName) {
    if (this.get('controller.sheetName') === sheetName) {
      this.transitionTo('fd-generation.list');
    }
  },
});

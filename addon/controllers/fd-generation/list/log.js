/**
  @module ember-flexberry-designer
*/

import Controller, {
  inject as controller
} from '@ember/controller';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import Builder from 'ember-flexberry-data/query/builder';

/**
  The controller for the form with a log of generation.

  @class FdGenerationListLogController
  @extends Ember.Controller
*/
export default Controller.extend({
  /**
    Link to {{#crossLink "FdGenerationListController"}}{{/crossLink}}.

    @property listController
    @type Ember.Controller
  */
  listController: controller('fd-generation.list'),

  /**
    Read-only alias for {{#crossLink "FdGenerationListController/sheetName:property"}}{{/crossLink}} property.

    @property sheetName
    @type String
    @readOnly
  */
  sheetName: computed.readOnly('listController.sheetName'),

  /**
    Generation log.

    @property generation
    @type DS.Model
  */
  generation: computed.alias('model.generation'),

  /**
    Time-sorted generation steps.

    @property generationLog
    @type Ember.NativeArray
  */
  generationSteps: computed.sort('generation.stepLogs', 'stepsSorting'),

  /**
    Description of sorting for {{#crossLink "FdGenerationListLogController/generationSteps:property"}}generation steps{{/crossLink}}.

    @property stepsSorting
    @type Array
    @default ['time']
  */
  stepsSorting: undefined,

  /**
    Log update interval, in milliseconds, performed by the {{#crossLink "FdGenerationListLogController/updateLog:method"}}{{/crossLink}} function.

    @property updateInterval
    @type Number
    @default 5000
  */
  updateInterval: 5000,

  /**
    Timer information for use in canceling log updating.

    @property timer
    @type Any
  */
  _timer: undefined,

  init() {
    this._super(...arguments);

    this.set('stepsSorting', ['time']);
  },

  /**
    Updates the log until generation completes.

    @method updateLog
  */
  updateLog() {
    let store = this.get('store');
    let modelName = 'fd-generation';
    let projectionName = 'EditFormView';

    let builder = new Builder(store)
      .from(modelName)
      .selectByProjection(projectionName)
      .byId(this.get('generation.id'));

    store.queryRecord(modelName, builder.build()).then((generation) => {
      this.set('generation', generation);
      this.set('_timer', generation.get('isRunning') ? run.later(this, this.updateLog, this.get('updateInterval')) : undefined);
    });
  },

  /**
    Stops updating the log.

    @method stopUpdate
  */
  stopUpdate() {
    let timer = this.get('_timer');
    if (timer) {
      run.cancel(timer);
    }
  },
});

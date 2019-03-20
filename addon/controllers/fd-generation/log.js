/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import { Query } from 'ember-flexberry-data';

const { Controller, computed, run } = Ember;
const { Builder } = Query;

/**
  The controller for the form with a log of generation.

  @class FdGenerationLogController
  @extends Ember.Controller
*/
export default Controller.extend({
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
    Description of sorting for {{#crossLink "FdGenerationLogController/generationSteps:property"}}generation steps{{/crossLink}}.

    @property stepsSorting
    @type Array
    @default ['time']
  */
  stepsSorting: ['time'],

  /**
    Log update interval, in milliseconds, performed by the {{#crossLink "FdGenerationLogController/updateLog:method"}}{{/crossLink}} function.

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

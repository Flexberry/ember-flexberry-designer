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
    See [EmberJS API](https://emberjs.com/api/).

    @method setupController
  */
  setupController(controller, { generation }) {
    this._super(...arguments);

    if (generation.get('isRunning')) {
      controller.updateLog();
    }
  },

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method resetController
  */
  resetController(controller) {
    controller.stopUpdate();
  },
});

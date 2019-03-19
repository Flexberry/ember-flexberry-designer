/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import { Query } from 'ember-flexberry-data';

const { Builder } = Query;

/**
  The route for the form with a list of all generations.

  @class FdGenerationIndexRoute
  @extends Ember.Route
*/
export default Ember.Route.extend({
  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}{{/crossLink}}.

    @property projectContext
    @type FdCurrentProjectContextService
  */
  projectContext: Ember.inject.service('fd-current-project-context'),

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method model
  */
  model() {
    let store = this.get('store');
    let modelName = 'fd-generation';
    let projectionName = 'ListFormView';

    let builder = new Builder(store)
      .from(modelName)
      .selectByProjection(projectionName)
      .where('stage', 'eq', this.get('projectContext').getCurrentStage())
      .orderBy('startTime desc');

    return Ember.RSVP.hash({
      generations: store.query(modelName, builder.build()),
    });
  },
});

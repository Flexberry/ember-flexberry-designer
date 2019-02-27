/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import { Query } from 'ember-flexberry-data';

const { Builder } = Query;

/**
  The route for the form with a list of all projects.

  @class FdAllProjectsRoute
  @extends Ember.Route
*/
export default Ember.Route.extend({
  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method model
  */
  model() {
    let store = this.get('store');
    let modelName = 'fd-dev-stage';
    let projectionName = 'ListFormView';

    let builder = new Builder(store)
      .from(modelName)
      .selectByProjection(projectionName)
      .orderBy('changeDate desc');

    return Ember.RSVP.hash({
      projects: store.query(modelName, builder.build()),
    });
  },
});

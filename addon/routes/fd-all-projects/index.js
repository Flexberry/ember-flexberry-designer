/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import { Query } from 'ember-flexberry-data';

const { Builder, ComplexPredicate, StringPredicate, Condition } = Query;

/**
  The route for the form with a list of all projects.

  @class FdAllProjectsIndexRoute
  @extends Ember.Route
*/
export default Ember.Route.extend({
  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property queryParams
  */
  queryParams: {
    search: { refreshModel: true },
  },

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method model
  */
  model(params) {
    let store = this.get('store');
    let modelName = 'fd-dev-stage';
    let projectionName = 'ListFormView';

    let builder = new Builder(store)
      .from(modelName)
      .selectByProjection(projectionName)
      .orderBy('changeDate desc');

    if (params.search) {
      let predicate = new ComplexPredicate(Condition.Or,
        new StringPredicate('name').contains(params.search),
        new StringPredicate('description').contains(params.search));

      builder.where(predicate);
    }

    return Ember.RSVP.hash({
      projects: store.query(modelName, builder.build()),
    });
  },
});

/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import { Query } from 'ember-flexberry-data';

const { Builder } = Query;

/**
  Parent route for all forms of generation.

  @class FdGenerationRoute
  @extends Ember.Route
*/
export default Ember.Route.extend({
  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}{{/crossLink}}.

    @property projectContext
    @type FdCurrentProjectContextService
  */
  projectContext: Ember.inject.service('fd-current-project-context'),

  actions: {
    /**
      Starts generation, opens its log when it starts successfully.

      @method actions.generate
    */
    generate() {
      let adapter = this.get('store').adapterFor('application');
      let project = this.get('projectContext').getCurrentStage();

      adapter.callFunction('Generate', { project }).then((result) => {
        this.transitionTo('fd-generation.log', result.value);
      });
    },
  },

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

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method afterModel
  */
  afterModel({ generations }) {
    let route = generations.get('length') === 0 ? 'first' : 'list';
    this.transitionTo(`fd-generation.${route}`);
  },
});

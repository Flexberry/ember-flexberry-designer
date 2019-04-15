/**
  @module ember-flexberry-designer
*/

import Route from '@ember/routing/route';

/**
  The route for the project creation form.

  @class FdAllProjectsNewRoute
  @extends Route
*/
export default Route.extend({
  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property queryParams
  */
  queryParams: {
    nameFromSearch: { as: 'name' },
  },

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method setupController
  */
  setupController(controller) {
    let projectName = controller.get('nameFromSearch');
    if (projectName) {
      controller.set('projectName', projectName);
      controller.set('nameFromSearch', '');
    }

    return this._super(...arguments);
  },

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method resetController
  */
  resetController(controller) {
    controller.set('projectName', undefined);

    return this._super(...arguments);
  },
});

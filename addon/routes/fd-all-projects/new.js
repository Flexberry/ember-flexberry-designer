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
    controller.set('routeName', this.get('routeName'));
    let projectName = controller.get('nameFromSearch');
    if (projectName) {
      controller.set('projectName', projectName);
      controller.set('nameFromSearch', '');
    }

    controller.resetSelectedFile();
    return this._super(...arguments);
  },

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method resetController
  */
  resetController(controller) {
    controller.set('projectName', undefined);
    controller.set('productName', undefined);
    controller.set('projectDescription', undefined);
    controller.set('accessIsPublic', true);

    return this._super(...arguments);
  },
});

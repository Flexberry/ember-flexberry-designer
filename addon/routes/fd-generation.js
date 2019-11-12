/**
  @module ember-flexberry-designer
*/

import Route from '@ember/routing/route';
import FdShareLoadData from '../mixins/fd-share-load-data';
import FdWrapperModel from '../mixins/fd-wrapper-model';
import { inject as service } from '@ember/service';
import Builder from 'ember-flexberry-data/query/builder';
import GenerationStateEnum from '../enums/new-platform-flexberry-web-designer-generation-state';

/**
  Parent route for all forms of generation.

  @class FdGenerationRoute
  @extends Ember.Route
*/
export default Route.extend(FdWrapperModel, FdShareLoadData, {

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default 'generation-sheet'
  */
  sheetComponentName: 'generation-sheet',

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method model
  */
  model() {
    let modelHash = {
      run: undefined,
      success: undefined,
      error: undefined,
      other: undefined,
    };

    let store = this.get('store');
    let modelName = 'fd-generation';
    let projectionName = 'EditFormView';

    let builder = new Builder(store)
      .from(modelName)
      .selectByProjection(projectionName)
      .where('stage', 'eq', this.get('currentProjectContext').getCurrentStage())
      .orderBy('startTime desc');

    return store.query(modelName, builder.build()).then((result) => {
      let runningGenerations = result.filterBy('state', GenerationStateEnum.Running);
      modelHash.run = this.wrapModel(runningGenerations);

      let successGenerations = result.filterBy('state', GenerationStateEnum.Success);
      modelHash.success = this.wrapModel(successGenerations);

      let errorGenerations = result.filterBy('state', GenerationStateEnum.Error);
      modelHash.error = this.wrapModel(errorGenerations);

      let otherGenerations = result.filter(function(item) {
        let state = item.get('state');
        return (state === GenerationStateEnum.Canceled || state === GenerationStateEnum.Warn || state === GenerationStateEnum.Unknown);
      });
      modelHash.other = this.wrapModel(otherGenerations);

      return modelHash;
    });
  },

  /**
    A hook you can use to setup the controller for the current route.
    [More info](https://www.emberjs.com/api/ember/release/classes/Route/methods/setupController?anchor=setupController).

    @method setupController
    @param {<a href="https://emberjs.com/api/ember/release/classes/Controller">Controller</a>} controller
  */
  setupController(controller) {
    this._super(...arguments);

    controller.set('sheetComponentName', this.get('sheetComponentName'));
  },

  actions: {
    /**
      See [EmberJS API](https://emberjs.com/api/).

      @method actions.willTransition
      @param {Object} transition
    */
    willTransition() {
      this.get('fdSheetService').closeSheet(this.get('sheetComponentName'));

      this._super(...arguments);
    },
  }
});

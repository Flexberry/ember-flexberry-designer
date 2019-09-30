import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { A, isArray } from '@ember/array';
import { isNone } from '@ember/utils';

export default Route.extend({

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
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
    @default 'application-model-sheet'
  */
  sheetComponentName: 'diagrams-sheet',

  /**
    A hook you can implement to convert the URL into the model for this route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_model).

    @method model
   */
  model: function() {
    let modelHash = {
      ad: undefined,
      cad: undefined,
      cod: undefined,
      dpd: undefined,
      sd: undefined,
      std: undefined,
      ucd: undefined
    };

    let store = this.get('store');
    let stage = this.get('currentProjectContext').getCurrentStageModel();

    // Get current ad diagrams.
    let allAdDiagrams = store.peekAll('fd-dev-uml-ad');
    let adDiagramsCurrentStage = allAdDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
    let wrapAdDiagramsCurrentStage = this.wrapModel(adDiagramsCurrentStage);
    modelHash.ad = A(wrapAdDiagramsCurrentStage);

    // Get current cad diagrams.
    let allCadDiagrams = store.peekAll('fd-dev-uml-cad');
    let cadDiagramsCurrentStage = allCadDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
    let wrapCadDiagramsCurrentStage = this.wrapModel(cadDiagramsCurrentStage);
    modelHash.cad = A(wrapCadDiagramsCurrentStage);

    // Get current cod diagrams.
    let allCodDiagrams = store.peekAll('fd-dev-uml-cod');
    let codDiagramsCurrentStage = allCodDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
    let wrapCodDiagramsCurrentStage = this.wrapModel(codDiagramsCurrentStage);
    modelHash.cod = A(wrapCodDiagramsCurrentStage);

    // Get current dpd diagrams.
    let allDpdDiagrams = store.peekAll('fd-dev-uml-dpd');
    let dpdDiagramsCurrentStage = allDpdDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
    let wrapDpdDiagramsCurrentStage = this.wrapModel(dpdDiagramsCurrentStage);
    modelHash.dpd = A(wrapDpdDiagramsCurrentStage);

    // Get current sd diagrams.
    let allSdDiagrams = store.peekAll('fd-dev-uml-sd');
    let sdDiagramsCurrentStage = allSdDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
    let wrapSdDiagramsCurrentStage = this.wrapModel(sdDiagramsCurrentStage);
    modelHash.sd = A(wrapSdDiagramsCurrentStage);

    // Get current std diagrams.
    let allStdDiagrams = store.peekAll('fd-dev-uml-std');
    let stdDiagramsCurrentStage = allStdDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
    let wrapStdDiagramsCurrentStage = this.wrapModel(stdDiagramsCurrentStage);
    modelHash.std = A(wrapStdDiagramsCurrentStage);

    // Get current ucd diagrams.
    let allUcdDiagrams = store.peekAll('fd-dev-uml-ucd');
    let ucdDiagramsCurrentStage = allUcdDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
    let wrapUcdDiagramsCurrentStage = this.wrapModel(ucdDiagramsCurrentStage);
    modelHash.ucd = A(wrapUcdDiagramsCurrentStage);

    return modelHash;
  },

  /**
    A hook you can use to setup the controller for the current route.
    [More info](https://www.emberjs.com/api/ember/release/classes/Route/methods/setupController?anchor=setupController).

    @method setupController
    @param {<a href="https://emberjs.com/api/ember/release/classes/Controller">Controller</a>} controller
  */
  setupController(controller) {
    this._super(...arguments);

    controller.set('isAddMode', false);
    controller.set('sheetComponentName', this.get('sheetComponentName'));
  },

  /**
    Wrap model data.

    @method wrapModel
    @param {Object} model
  */
  wrapModel(model) {
    if (isNone(model)) {
      return null;
    }

    if (isArray(model)) {
      return A(model).map((element) => ({ data: element, active: false }));
    } else {
      return { data: model, active: false };
    }
  },

  actions: {
    /**
      It sends message about transition to corresponding controller.

      The willTransition action is fired at the beginning of any attempted transition with a Transition object as the sole argument.
      [More info](http://emberjs.com/api/classes/Ember.Route.html#event_willTransition).

      @method actions.willTransition
    */
    willTransition() {
      this.get('fdSheetService').transitionFromSheet(transition, this.get('sheetComponentName'), this.get('sheetViewName'));

      this._super(...arguments);
    }
  }
});

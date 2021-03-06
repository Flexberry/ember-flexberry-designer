import Route from '@ember/routing/route';
import FdShareLoadData from '../mixins/fd-share-load-data';
import FdWrapperModel from '../mixins/fd-wrapper-model';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend(FdWrapperModel, FdShareLoadData, {

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
    @default 'diagram-sheet'
  */
  sheetComponentName: 'diagram-sheet',

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
    let adDiagramsCurrentStageSort = adDiagramsCurrentStage.sortBy('name');
    let wrapAdDiagramsCurrentStage = this.wrapModel(adDiagramsCurrentStageSort);
    modelHash.ad = A(wrapAdDiagramsCurrentStage);

    // Get current cad diagrams.
    let allCadDiagrams = store.peekAll('fd-dev-uml-cad');
    let cadDiagramsCurrentStage = allCadDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
    let cadDiagramsCurrentStageSort = cadDiagramsCurrentStage.sortBy('name');
    let wrapCadDiagramsCurrentStage = this.wrapModel(cadDiagramsCurrentStageSort);
    modelHash.cad = A(wrapCadDiagramsCurrentStage);

    // Get current cod diagrams.
    let allCodDiagrams = store.peekAll('fd-dev-uml-cod');
    let codDiagramsCurrentStage = allCodDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
    let codDiagramsCurrentStageSort = codDiagramsCurrentStage.sortBy('name');
    let wrapCodDiagramsCurrentStage = this.wrapModel(codDiagramsCurrentStageSort);
    modelHash.cod = A(wrapCodDiagramsCurrentStage);

    // Get current dpd diagrams.
    let allDpdDiagrams = store.peekAll('fd-dev-uml-dpd');
    let dpdDiagramsCurrentStage = allDpdDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
    let dpdDiagramsCurrentStageSort = dpdDiagramsCurrentStage.sortBy('name');
    let wrapDpdDiagramsCurrentStage = this.wrapModel(dpdDiagramsCurrentStageSort);
    modelHash.dpd = A(wrapDpdDiagramsCurrentStage);

    // Get current sd diagrams.
    let allSdDiagrams = store.peekAll('fd-dev-uml-sd');
    let sdDiagramsCurrentStage = allSdDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
    let sdDiagramsCurrentStageSort = sdDiagramsCurrentStage.sortBy('name');
    let wrapSdDiagramsCurrentStage = this.wrapModel(sdDiagramsCurrentStageSort);
    modelHash.sd = A(wrapSdDiagramsCurrentStage);

    // Get current std diagrams.
    let allStdDiagrams = store.peekAll('fd-dev-uml-std');
    let stdDiagramsCurrentStage = allStdDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
    let stdDiagramsCurrentStageSort = stdDiagramsCurrentStage.sortBy('name');
    let wrapStdDiagramsCurrentStage = this.wrapModel(stdDiagramsCurrentStageSort);
    modelHash.std = A(wrapStdDiagramsCurrentStage);

    // Get current ucd diagrams.
    let allUcdDiagrams = store.peekAll('fd-dev-uml-ucd');
    let ucdDiagramsCurrentStage = allUcdDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
    let ucdDiagramsCurrentStageSort = ucdDiagramsCurrentStage.sortBy('name');
    let wrapUcdDiagramsCurrentStage = this.wrapModel(ucdDiagramsCurrentStageSort);
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
    controller.set('searchValue', '');
    controller.set('routeName', this.get('routeName'));
    controller.set('sheetComponentName', this.get('sheetComponentName'));
  },

  actions: {
    /**
      It sends message about transition to corresponding controller.

      The willTransition action is fired at the beginning of any attempted transition with a Transition object as the sole argument.
      [More info](http://emberjs.com/api/classes/Ember.Route.html#event_willTransition).

      @method actions.willTransition
    */
    willTransition(transition) {
      this.get('fdSheetService').transitionFromSheet(transition, this.get('sheetComponentName'));

      this._super(...arguments);
    }
  }
});

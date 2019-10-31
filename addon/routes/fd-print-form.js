import EditFormRoute from 'ember-flexberry/routes/edit-form';
import FdFormCheckTransitionMixin from '../mixins/fd-form-check-transition';
import FdPreloadStageMetadata from 'ember-flexberry-designer/utils/fd-preload-stage-metadata';
import $ from 'jquery';

export default EditFormRoute.extend(FdFormCheckTransitionMixin, {
  modelProjection: 'PrintDiagram',
  modelName: 'fd-diagram',

  afterModel(model) {
    this._super(model);
    let store = this.get('store');
    let stagePK = model.get('subsystem.stage.id');
    return FdPreloadStageMetadata.call(this, store, stagePK).then(()=>{      
      $(document).ready(function(){
        window.print();
      });      
    });    
  },

  model(params, transition) {
    let modelName = transition.queryParams.modelName || this.get('modelName');
    let modelProjName = this.get('modelProjection');

    // Get data from service in order to decide if it is necessary to reload data or not.
    // If already visited detail's route is observed or it is come back to agregators's route,
    // it is not necessary (otherwise data merge with loaded data can occur occasionally).
    let flexberryDetailInteractionService = this.get('flexberryDetailInteractionService');
    let modelCurrentNotSaved = flexberryDetailInteractionService.get('modelCurrentNotSaved');
    let modelSelectedDetail = flexberryDetailInteractionService.get('modelSelectedDetail');
    let needReload = !!(modelCurrentNotSaved || (modelSelectedDetail && modelSelectedDetail.get('hasDirtyAttributes')));

    // TODO: now 'findRecord' at ember-flexberry-projection not support 'reload: false' flag.
    let findRecordParameters = { reload: needReload, projection: modelProjName };

    // :id param defined in router.js
    return this.store.findRecord(modelName, params.id, findRecordParameters);
  },   
});

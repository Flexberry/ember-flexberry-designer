import Ember from 'ember';

export default Ember.Route.extend({
  modelProjection: 'TypeDefinitionE',
  modelName: 'fd-dev-type-definition',
  currentProjectContext: Ember.inject.service('fd-current-project-context'),
  thisTypedef: undefined,

  afterModel: function(model) {
    this._super(model);

    if (!model.get('caption')) {
      model.set('caption', model.get('name'));
    }
  },

  model: function(params) {
    let store = this.get('store');
    let stageId = this.get('currentProjectContext').getCurrentStage();

    let allClasses = store.peekAll('fd-dev-class');
    let allStages = store.peekAll('fd-dev-stage');

    this.set('thisTypedef', allClasses.findBy('id', params.id));
    let thisTypedef = this.get('thisTypedef').get('name');


    let stage = allStages.findBy('id', stageId); // typemaps are inside, in XML. Need to find one equal to current type and let change it.
    let typeMapCSStr = stage.get('typeMapCSStr').findBy('name', thisTypedef);
    let typeMapOracleStr = stage.get('typeMapOracleStr');
    let typeMapPostgreStr = stage.get('typeMapPostgreStr');
    let typeMapSQLStr = stage.get('typeMapSQLStr');
    return azaza;
  }
});

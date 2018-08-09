import Ember from 'ember';

export default Ember.Route.extend({
  modelProjection: 'TypeDefinitionE',
  modelName: 'fd-dev-type-definition',
  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  afterModel: function(model) {
    this._super(model);
  },

  model: function(params) {
    let modelHash = Ember.Object.create({
      className: undefined,
      CSStr: undefined,
      oracleStr: undefined,
      postgreStr: undefined,
      SQLStr: undefined
    });

    let store = this.get('store');
    let stageId = this.get('currentProjectContext').getCurrentStage();

    let allClasses = store.peekAll('fd-dev-class');
    let allStages = store.peekAll('fd-dev-stage');

    modelHash.className = allClasses.findBy('id', params.id).get('name');

    let stage = allStages.findBy('id', stageId); // typemaps are inside, in XML. Need to find one equal to current type and let change it.
    if (!Ember.isEmpty(stage.get('typeMapCSStr'))) {
      modelHash.CSStr = stage.get('typeMapCSStr').findBy('name', modelHash.className);
    }

    if (!Ember.isEmpty(stage.get('typeMapOracleStr'))) {
      modelHash.oracleStr = stage.get('typeMapOracleStr').findBy('name', modelHash.className);
    }

    if (!Ember.isEmpty(stage.get('typeMapPostgreStr'))) {
      modelHash.postgreStr = stage.get('typeMapPostgreStr').findBy('name', modelHash.className);
    }

    if (!Ember.isEmpty(stage.get('typeMapSQLStr'))) {
      modelHash.SQLStr = stage.get('typeMapSQLStr').findBy('name', modelHash.className);
    }

    return modelHash;
  }
});

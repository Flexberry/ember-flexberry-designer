import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import { Query } from 'ember-flexberry-data';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';

export default EditFormController.extend({

  parentRoute: 'fd-stage-list-form',

  store: Ember.inject.service('store'),

  moduleSetting: {
    FrontendGitRepoUrl: '',
    FrontendLogin: '',
    FrontendPassword: '',
    FrontendBranch: '',
    FrontendPublishGh: false,
    BackendGitRepoUrl: '',
    BackendLogin: '',
    BackendPassword: '',
    BackendBranch: '',
    GenerateCordova: false,
    ProcessMethodology: false,
    ProcessConsoleAddress: '',
    DefaultStorage: '',
  },

  _storageType: Ember.computed(function() {
    let currentStage = this.get('model.id');

    let stageEqualNull = new SimplePredicate('stage', '==', null);
    let stageEqualCurrentStage = new SimplePredicate('stage', '==', currentStage);
    let condition = stageEqualNull.or(stageEqualCurrentStage);

    let store = this.get('store');

    let builder = new Query.Builder(store)
      .from('fd-storage-type')
      .selectByProjection('EditFormView')
      .where(condition);

    return store.query('fd-storage-type', builder.build()).then(function(data) {
      let results = data.map(item => item.get('shortName'));
      return results;
    });
  }),

  save() {
    this._super(...arguments);

    let stagePk = this.get('model.id');
    let moduleSetting = this.get('moduleSetting');
    let moduleSettingTypes = Object.keys(moduleSetting);
    let host = this.get('store').adapterFor('application').host;

    for (let i = 0; i < moduleSettingTypes.length; i++) {
      let moduleSettingType = moduleSettingTypes[i];
      let valueModuleSetting = moduleSetting[moduleSettingType];

      Ember.$.ajax({
        type: 'GET',
        xhrFields: { withCredentials: true },
        url: `${host}/SaveCurrentModuleSetting(` +
          `project=${stagePk},` +
          `moduleSettingType='${moduleSettingType}',` +
          `valueModuleSetting='${valueModuleSetting}'` +
          `)`
      });
    }
  }

});

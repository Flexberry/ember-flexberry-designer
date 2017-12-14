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

  _changedModel: Ember.observer('model.id', function() {
    this.set('moduleSetting.FrontendGitRepoUrl', '');
    this.set('moduleSetting.FrontendLogin', '');
    this.set('moduleSetting.FrontendPassword', '');
    this.set('moduleSetting.FrontendBranch', '');
    this.set('moduleSetting.FrontendPublishGh', false);
    this.set('moduleSetting.BackendGitRepoUrl', '');
    this.set('moduleSetting.BackendLogin', '');
    this.set('moduleSetting.BackendPassword', '');
    this.set('moduleSetting.BackendBranch', '');
    this.set('moduleSetting.GenerateCordova', false);
    this.set('moduleSetting.ProcessMethodology', false);
    this.set('moduleSetting.ProcessConsoleAddress', '');
    this.set('moduleSetting.DefaultStorage', '');
  }),

  _storageType: Ember.computed('model.id', function() {
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

    let valueModuleSetting = Ember.A();
    let moduleSettingData = Ember.A();

    for (let i = 0; i < moduleSettingTypes.length; i++) {
      let valueModuleSettingData = {
        'ValueXML': moduleSetting[moduleSettingTypes[i]]
      };

      let moduleSettingTypeData = {
        'Name': moduleSettingTypes[i]
      };

      valueModuleSetting.push(valueModuleSettingData);
      moduleSettingData.push(moduleSettingTypeData);
    }

    let data = { 'project': stagePk, 'moduleSettingType': moduleSettingData, 'valueModuleSetting': valueModuleSetting };

    Ember.$.ajax({
      type: 'POST',
      xhrFields: { withCredentials: true },
      url: `${host}/SaveCurrentModuleSetting`,
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    });
  }
});

import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';

import EditFormController from 'ember-flexberry/controllers/edit-form';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';
import Builder from 'ember-flexberry-data/query/builder';

export default EditFormController.extend({

  parentRoute: 'fd-stage-list-form',

  store: service('store'),

  moduleSetting: undefined,

  _changedModel: observer('model.id', function() {
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

  _storageType: computed('model.id', function() {
    let currentStage = this.get('model.id');

    let stageEqualNull = new SimplePredicate('stage', '==', null);
    let stageEqualCurrentStage = new SimplePredicate('stage', '==', currentStage);
    let condition = stageEqualNull.or(stageEqualCurrentStage);

    let store = this.get('store');

    let builder = new Builder(store)
      .from('fd-storage-type')
      .selectByProjection('EditFormView')
      .where(condition);

    return store.query('fd-storage-type', builder.build()).then(function(data) {
      let results = data.map(item => item.get('shortName'));
      return results;
    });
  }),

  save() {
    this._super(...arguments).then(() => {
      let stagePk = this.get('model.id');
      let moduleSetting = this.get('moduleSetting');
      let moduleSettingTypes = Object.keys(moduleSetting);

      let valueModuleSetting = A();
      let moduleSettingData = A();

      for (let i = 0; i < moduleSettingTypes.length; i++) {
        let valueModuleSettingData = {
          'ValueXML': moduleSetting[moduleSettingTypes[i]]
        };

        let moduleSettingTypeData = {
          'Name': moduleSettingTypes[i]
        };

        valueModuleSetting.pushObject(valueModuleSettingData);
        moduleSettingData.pushObject(moduleSettingTypeData);
      }

      let data = { 'project': stagePk.toString(), 'moduleSettingType': moduleSettingData, 'valueModuleSetting': valueModuleSetting };
      let adapter = getOwner(this).lookup('adapter:application');

      adapter.callAction('SaveCurrentModuleSetting', data, null, { withCredentials: true });
    });
  },

  init() {
    this._super(...arguments);

    this.set('moduleSetting', {
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
    });
  }
});

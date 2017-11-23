import Ember from 'ember';
import EditFormRoute from 'ember-flexberry/routes/edit-form';

export default EditFormRoute.extend({
  modelProjection: 'EditFormView',
  modelName: 'fd-dev-stage',

  setupController: function(controller, model) {
    this._super(...arguments);

    let stagePk = model.id;
    let host = this.get('store').adapterFor('application').host;
    Ember.$.ajax({
      type: 'GET',
      xhrFields: { withCredentials: true },
      url: `${host}/GetCurrentModuleSetting(project=${stagePk})`,
      success(result) {
        let moduleSettingValue = result.value.split(' ');
        moduleSettingValue = moduleSettingValue.map(function(setting) {
          return setting === 'null' ? null : setting;
        });

        controller.set('moduleSetting.FrontendGitRepoUrl', moduleSettingValue[0]);
        controller.set('moduleSetting.FrontendLogin', moduleSettingValue[1]);
        controller.set('moduleSetting.FrontendPassword', moduleSettingValue[2]);
        controller.set('moduleSetting.FrontendBranch', moduleSettingValue[3]);
        controller.set('moduleSetting.FrontendPublishGh', moduleSettingValue[4]);
        controller.set('moduleSetting.BackendGitRepoUrl', moduleSettingValue[5]);
        controller.set('moduleSetting.BackendLogin', moduleSettingValue[6]);
        controller.set('moduleSetting.BackendPassword', moduleSettingValue[7]);
        controller.set('moduleSetting.BackendBranch', moduleSettingValue[8]);
        controller.set('moduleSetting.GenerateCordova', moduleSettingValue[9]);
        controller.set('moduleSetting.ProcessMethodology', moduleSettingValue[10]);
        controller.set('moduleSetting.ProcessConsoleAddress', moduleSettingValue[11]);
        controller.set('moduleSetting.DefaultStorage', moduleSettingValue[12]);
      }
    });
  }
});

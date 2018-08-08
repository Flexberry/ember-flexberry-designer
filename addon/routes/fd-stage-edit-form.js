import Ember from 'ember';
import EditFormRoute from 'ember-flexberry/routes/edit-form';
import FdLoadingForTransitionMixin from '../mixins/fd-loading-for-transition';

export default EditFormRoute.extend(FdLoadingForTransitionMixin, {
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
        let moduleSettingValue = JSON.parse(result.value);

        for (let i = 0; i < moduleSettingValue.length; i++) {
          switch (moduleSettingValue[i].Key) {
            case 'frontendgitrepourl':
              controller.set('moduleSetting.FrontendGitRepoUrl', moduleSettingValue[i].Value);
              break;
            case 'frontendlogin':
              controller.set('moduleSetting.FrontendLogin', moduleSettingValue[i].Value);
              break;
            case 'frontendpassword':
              let valueFrontendPassword = null;
              if (moduleSettingValue[i].Value) {
                valueFrontendPassword = '********';
              }

              controller.set('moduleSetting.FrontendPassword', valueFrontendPassword);
              break;
            case 'frontendbranch':
              controller.set('moduleSetting.FrontendBranch', moduleSettingValue[i].Value);
              break;
            case 'frontendpublishgh':
              controller.set('moduleSetting.FrontendPublishGh', moduleSettingValue[i].Value);
              break;
            case 'backendgitrepourl':
              controller.set('moduleSetting.BackendGitRepoUrl', moduleSettingValue[i].Value);
              break;
            case 'backendlogin':
              controller.set('moduleSetting.BackendLogin', moduleSettingValue[i].Value);
              break;
            case 'backendpassword':
              let valueBackendPassword = null;
              if (moduleSettingValue[i].Value) {
                valueBackendPassword = '********';
              }

              controller.set('moduleSetting.BackendPassword', valueBackendPassword);
              break;
            case 'backendbranch':
              controller.set('moduleSetting.BackendBranch', moduleSettingValue[i].Value);
              break;
            case 'generatecordova':
              controller.set('moduleSetting.GenerateCordova', moduleSettingValue[i].Value);
              break;
            case 'processmethodology':
              controller.set('moduleSetting.ProcessMethodology', moduleSettingValue[i].Value);
              break;
            case 'processconsoleaddress':
              controller.set('moduleSetting.ProcessConsoleAddress', moduleSettingValue[i].Value);
              break;
            case 'defaultstorage':
              controller.set('moduleSetting.DefaultStorage', moduleSettingValue[i].Value);
              break;
          }
        }
      }
    });
  }
});
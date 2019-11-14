import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
    List exist moduleSettings.

    @property moduleSettings
    @type Array
   */
  generationSettings: undefined,

  model() {
    const store = this.get('store');
    const stage = this.get('currentProjectContext').getCurrentStageModel();

    const adapter = store.adapterFor('application');
    const data = { 'project': stage.get('id'), 'moduleSettingTypes': this.get('generationSettings') };

    return adapter.callAction('GetCurrentModuleSettings', data, null, { withCredentials: true }).then((generationSettings) => {
      let currentGenerationSettings = JSON.parse(generationSettings.value);

      return {
        stage: stage,
        settings: currentGenerationSettings
      };
    });
  },

  init() {
    this._super(...arguments);
    this.set('generationSettings',
      ['FrontendPublishGh',
       'FrontendGitRepoUrl',
       'BackendGitRepoUrl',
       'FrontendLogin',
       'BackendLogin',
       'FrontendPassword',
       'BackendPassword',
       'FrontendBranch',
       'BackendBranch',
       'FrontendPublicKey',
       'BackendPublicKey',
       'FrontendPrivateKey',
       'BackendPrivateKey'
      ]);
  }
});

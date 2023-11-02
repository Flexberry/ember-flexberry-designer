import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { all } from 'rsvp';

export default Route.extend({

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
    List exist generationSettings.

    @property generationSettings
    @type Array
   */
  generationSettings: undefined,

  model() {
    let modelHash = {
      stage: undefined,
      settings: undefined,
      usersAccess: undefined,
    };

    const store = this.get('store');
    modelHash.stage = this.get('currentProjectContext').getCurrentStageModel();

    const adapter = store.adapterFor('application');
    const data = { 'project': modelHash.stage.get('id'), 'moduleSettingTypes': this.get('generationSettings') };

    const promises = [
      adapter.callAction('GetCurrentModuleSettings', data, null, { withCredentials: true }),
      adapter.callFunction('GetUsersAccessForStage', { project: modelHash.stage.get('id').toString() }, null, { withCredentials: true })
    ];

    return all(promises).then((result) => {
      const generationSettings = result[0];
      const usersAccess = result[1];

      modelHash.settings = JSON.parse(generationSettings.value);
      if (!isBlank(usersAccess.value)) {
        modelHash.usersAccess = A(JSON.parse(usersAccess.value));
      }

      return modelHash;
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
  },

  /**
    A hook you can use to setup the controller for the current route.
    [More info](https://www.emberjs.com/api/ember/release/classes/Route/methods/setupController?anchor=setupController).

    @method setupController
    @param {<a href="https://emberjs.com/api/ember/release/classes/Controller">Controller</a>} controller
  */
  setupController(controller) {
    this._super(...arguments);

    controller.set('routeName', this.get('routeName'));
  }
});

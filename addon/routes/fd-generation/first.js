/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

/**
  The route for the form with the setting of the first generation.

  @class FdGenerationFirstRoute
  @extends Ember.Route
*/
export default Ember.Route.extend({
  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}{{/crossLink}}.

    @property projectContext
    @type FdCurrentProjectContextService
  */
  projectContext: Ember.inject.service('fd-current-project-context'),

  actions: {
    /**
      Saves settings for generation and runs generation.

      @method actions.saveAndGenerate
      @param {Object} settings Object with settings for generation.
    */
    saveAndGenerate(settings) {
      let adapter = this.get('store').adapterFor('application');
      let project = this.get('projectContext').getCurrentStage();

      let moduleSettingType = [{ Name: 'FrontendGitRepoUrl' }, { Name: 'FrontendLogin' }, { Name: 'FrontendPassword' }];
      let valueModuleSetting = [{ ValueXML: settings.gitUrl }, { ValueXML: settings.login }, { ValueXML: settings.password }];

      adapter.callAction('SaveCurrentModuleSetting', { project, moduleSettingType, valueModuleSetting }).finally(() => {
        this.send('generate');
      });
    },
  },

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @method model
  */
  model() {
    let adapter = this.get('store').adapterFor('application');
    let project = this.get('projectContext').getCurrentStage();

    return new Ember.RSVP.Promise((resolve, reject) => {
      adapter.callFunction('GetCurrentModuleSetting', { project }, null, null, resolve, reject);
    });
  },
});

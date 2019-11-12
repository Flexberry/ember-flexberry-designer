import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Route.extend({

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),


  /**
   List exist subsystems.

   @property subsystems
   @type Array
   */
  subsystems: undefined,

  /**
    A hook you can implement to convert the URL into the model for this route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_model).

    @method model
   */
  model: function() {
    const subsystems = this.get('subsystems');
    const stage = this.get('currentProjectContext').getCurrentStage();
    const adapter = this.get('store').adapterFor('application');
    const data = { 'project': stage, 'moduleSettingTypes': subsystems };

    return adapter.callAction('GetCurrentModuleSettings', data, null, { withCredentials: true }).then((subsystemsSettings) => {
      let currentSubsystemsSettings = JSON.parse(subsystemsSettings.value);
      let updateSubsystemsSettings = {};
      for (let prop in currentSubsystemsSettings) {
        let value = currentSubsystemsSettings[prop];
        let newValue = !isBlank(value) ? JSON.parse(value) : {};
        updateSubsystemsSettings[prop] = newValue;
      }

      return updateSubsystemsSettings;
    });
  },

  init() {
    this._super(...arguments);

    this.set('subsystems', ['GisSubsystemSettings'/*, 'SecuritySubsystemSettings', 'AuditSubsystemSettings'*/]);
  }
});

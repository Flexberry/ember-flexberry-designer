import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  actions: {
    /**
      Save ModuleSettings.

       @method actions.save
    */
    save() {
      const stage = this.get('currentProjectContext').getCurrentStage();
      const adapter = this.get('store').adapterFor('application');
      const data = { 'project': stage, 'moduleSettings': JSON.stringify(this.get('model')) };

      return adapter.callAction('SaveCurrentModuleSettings', data, null, { withCredentials: true });
    }
  }
});

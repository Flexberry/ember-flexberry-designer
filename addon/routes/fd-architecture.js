import Route from '@ember/routing/route';

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
    const data = { project: stage, subsystems: subsystems };

    return null;
    /*return adapter.callFunction('GetSubsystemsSettings', data, null, { withCredentials: true }).then((subsystemsSettings) => {
      return subsystemsSettings.value;
    });*/
  },

  init() {
    this._super(...arguments);

    this.set('subsystems', ['gis-subsystem'/*, 'security-subsystem', 'audit-subsystem'*/]);
  },

  /**
    A hook you can use to setup the controller for the current route.
    [More info](https://www.emberjs.com/api/ember/release/classes/Route/methods/setupController?anchor=setupController).

    @method setupController
    @param {<a href="https://emberjs.com/api/ember/release/classes/Controller">Controller</a>} controller
  */
  setupController(controller) {
    this._super(...arguments);

    controller.set('subsystems', this.get('subsystems'));
  },
});

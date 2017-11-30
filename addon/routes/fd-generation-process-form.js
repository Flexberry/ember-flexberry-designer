import Ember from 'ember';

export default Ember.Route.extend({
  modelProjection: 'EditFormView',
  modelName: 'fd-generation',

  /**
    A hook you can implement to convert the URL into the model for this route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_model).

    @method model
    @param {Object} params
   */
  model(params) {
    this._super.apply(this, arguments);

    let modelName = this.get('modelName');
    let modelProjName = this.get('modelProjection');

    // :id param defined in router.js
    return this.store.findRecord(modelName, params.id, { projection: modelProjName });
  },

  /**
    A hook you can use to reset controller values either when the model changes or the route is exiting.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_resetController).

    @method resetController
    @param {Ember.Controller} controller
    @param {Boolean} isExisting
    @param {Object} transition
   */
  resetController(controller) {
    this._super(...arguments);

    controller.set('generationLog', Ember.A());
    controller.set('modelName', null);
    controller.set('modelProjection', null);
    controller.set('currentGeneration', null);
  },

  /**
    A hook you can use to setup the controller for the current route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_setupController).

    @method setupController
    @param {Ember.Controller} controller
    @param {Object} model
   */
  setupController(controller, model) {
    this._super(...arguments);

    controller.set('modelName', this.get('modelName'));
    controller.set('modelProjection', this.get('modelProjection'));
    controller.set('generationId', Ember.get(this.paramsFor('fd-generation-process-form'), 'id'));
    if (!Ember.isNone(model)) {
      controller.set('generationLog', model.get('stepLogs'));
    }

    controller.generationLogUpdate(5000);
  },
});

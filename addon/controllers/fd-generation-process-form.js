import Ember from 'ember';
const { getOwner } = Ember;

export default Ember.Controller.extend({
  /**
    Current store.

    @property store
    @type DS.Store
    @readOnly
  */
  store: Ember.inject.service('store'),

  /**
    Generation log records array.

    @property generationLog
    @type Array
    @readOnly
  */
  generationLog: Ember.A(),

  /**
    Current generation object.

    @property currentGeneration
    @type Object
  */
  currentGeneration: null,

  /**
    Sorted generation log records array.

    @property sortedGenerationLog
    @type Array
  */
  sortedGenerationLog: Ember.computed('currentGeneration.stepLogs.[]', function() {
    let stepLogs = this.get('currentGeneration.stepLogs') || Ember.A();
    return stepLogs.sortBy('time');
  }),

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  generationService: Ember.inject.service('fd-generation'),

  actions: {
    /**
      Handler for click on generate button.

      @method actions.generate
     */
    generate() {
      let _this = this;
      let stagePk = _this.get('currentProjectContext').getCurrentStage();
      let adapter = getOwner(this).lookup('adapter:application');

      adapter.callFunction('Generate', { project: stagePk.toString() }, null, { withCredentials: true },
      (result) => {
        _this.set('generationService.lastGenerationToken', result);
        result = result || {};
        _this.transitionToRoute(_this.get('editFormRoute'), Ember.get(result, 'value'));
      },
      () => {});
    }
  },

  /**
    Update generation log records array.

    @method generationLogUpdate
    @param {Integer} interval Interval for sending OData requests
   */
  generationLogUpdate(interval) {
    let modelName = this.get('modelName');
    let modelProjection = this.get('modelProjection');
    let modelId = this.get('generationId');
    let _this = this;
    if (modelName && modelProjection && modelId) {
      this.store.findRecord(modelName, modelId, { projection: modelProjection }).then(record => {
        if (!Ember.isNone(record)) {
          _this.set('currentGeneration', record);
          Ember.$('.generation-progress-bar').progress({
            text: {
              active: '{percent}%',
              success: '{percent}%'
            }
          }).progress('set percent', record.get('percentComplete'));
          if (!record.get('isRunning')) {
            return;
          }
        }

        Ember.run.later(_this, function() {
          let currentModelId = _this.get('generationId');
          if (modelId === currentModelId) {
            _this.generationLogUpdate(interval);
          }
        }, interval);
      });
    }
  }
});

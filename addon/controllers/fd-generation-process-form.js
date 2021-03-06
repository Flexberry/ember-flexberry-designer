import Controller from '@ember/controller';
import { A } from '@ember/array';
import { getOwner } from '@ember/application';
import { run } from '@ember/runloop';
import { isNone } from '@ember/utils';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Controller.extend({
  /**
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: service(),

  /**
    Current store.

    @property store
    @type DS.Store
    @readOnly
  */
  store: service('store'),

  /**
    Generation log records array.

    @property generationLog
    @type Array
    @readOnly
  */
  generationLog: A(),

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
  sortedGenerationLog: computed('currentGeneration.stepLogs.[]', function() {
    let stepLogs = this.get('currentGeneration.stepLogs') || A();
    return stepLogs.sortBy('time');
  }),

  currentProjectContext: service('fd-current-project-context'),

  generationService: service('fd-generation'),

  actions: {
    /**
      Handler for click on generate button.

      @method actions.generate
     */
    generate() {
      this.get('appState').loading();
      let _this = this;
      let stagePk = _this.get('currentProjectContext').getCurrentStage();
      let adapter = getOwner(this).lookup('adapter:application');

      adapter.callFunction('Generate', { project: stagePk.toString() }, null, { withCredentials: true },
      (result) => {
        _this.set('generationService.lastGenerationToken', result);
        result = result || {};
        _this.get('appState').reset();
        _this.transitionToRoute(_this.get('editFormRoute'), get(result, 'value'));
      },
      () => {
        _this.get('appState').reset();
        _this.set('error', new Error(_this.get('i18n').t('forms.fd-generation-process-form.connection-error-text')));
      });
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
        if (!isNone(record)) {
          _this.set('currentGeneration', record);
          $('.generation-progress-bar').progress({
            text: {
              active: '{percent}%',
              success: '{percent}%'
            }
          }).progress('set percent', record.get('percentComplete'));
          if (!record.get('isRunning')) {
            return;
          }
        }

        run.later(_this, function() {
          let currentModelId = _this.get('generationId');
          if (modelId === currentModelId) {
            _this.generationLogUpdate(interval);
          }
        }, interval);
      });
    }
  }
});

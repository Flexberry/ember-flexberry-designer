import Ember from 'ember';

export default Ember.Controller.extend({
  /**
    Current store.

    @property store
    @type DS.Store
    @readOnly
  */
  store: Ember.inject.service('store'),
  generationLog: '',
  currentProjectContext: Ember.inject.service('fd-current-project-context'),
  generationService: Ember.inject.service('fd-generation'),
  actions: {
    generate() {
      let _this = this;
      let stagePk = _this.get('currentProjectContext').getCurrentStage();
      let host = _this.get('store').adapterFor('application').host;
      Ember.$.ajax({
        type: 'GET',
        xhrFields: { withCredentials: true },
        url: `${host}/Generate(project=${stagePk})`,
        success(result) {
          _this.set('generationService.lastGenerationToken', result);
        },
        error() {
          // TODO: обработать ситуацию, когда произошла ошибка.
          let i18n = _this.get('i18n');
          let errorCaption = i18n.t('forms.fd-generation-process-form.generation-start-error-caption');
          _this.set('generationLog', errorCaption);
        },
      });
    }
  }
});

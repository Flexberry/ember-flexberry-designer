import { resolve, reject } from 'rsvp';
import { isBlank } from '@ember/utils';
import FdPreloadStageMetadata from 'ember-flexberry-designer/utils/fd-preload-stage-metadata';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  /**
    Update uml errors.

    @method _umlСorrector
  */
  _umlСorrector() {
    const store = this.get('store');
    const adapter = store.adapterFor('application');
    const stageId = this.get('currentProjectContext').getCurrentStage();
    const data = { 'stageId': stageId };

    this.get('appState').loading();
    adapter.callAction('CheckLockAllStageObgects', data, null, { withCredentials: true }).then((isLock) => {
      return isLock.value ? resolve() : reject({ message: this.get('i18n').t('forms.fd-navigation.custom-message.lock-stage').toString() });
    })
    .then(() => adapter.callFunction('CorrectStage', data, null, { withCredentials: true }))
    .then((result) => {
      if (!isBlank(result.value)) {
        this.get('appState').reset();
        const i18n = this.get('i18n');
        let message = i18n.t('forms.fd-navigation.custom-message.corrector-message').toString() + `\n ${result.value}`;

        this.get('fdDialogService').showCustomMessage(
          message,
          i18n.t('forms.fd-navigation.custom-message.corrector-header').toString(),
          false
        );

        let transitionFunction = function() {
          this.removeObserver('show', this, transitionFunction);
          FdPreloadStageMetadata.call(this, this.get('store'), this.get('currentProjectContext').getCurrentStage()).then(() => {
            this.set('model', this.get('modelFunction')());
          }).finally(() => {
            this.get('appState').reset();
          });
        };

        this.addObserver('show', this, transitionFunction);
      }
    }).catch((error) => {
      this.get('fdDialogService').showErrorMessage(error.message);
    }).finally(() => {
      this.get('appState').reset();
    });
  }

});
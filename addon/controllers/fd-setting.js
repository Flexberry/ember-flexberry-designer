import Controller from '@ember/controller';
import FdSheetCloseConfirm from '../mixins/fd-sheet-close-confirm';
import { inject as service } from '@ember/service';
import { resolve, reject } from 'rsvp';
import { isNone, isBlank } from '@ember/utils';
import { transliteration } from '../utils/fd-transliteration';

import { SimplePredicate, ComplexPredicate } from 'ember-flexberry-data/query/predicate';
import Builder from 'ember-flexberry-data/query/builder';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';
import Condition from 'ember-flexberry-data/query/condition';

export default Controller.extend(FdSheetCloseConfirm, {
  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Service for managing the message dialog.

    @property fdDialogService
    @type fdDialogService
  */
  fdDialogService: service('fd-dialog-service'),

  /**
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: service(),

  /**
    Access value.

    @property accessIsPublic
    @type Bool
  */
  accessIsPublic: true,

  /**
    Check lexical structure.

    @method keyPressPattern
  */
  keyPressPattern(e) {
    if(!((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122) || e.keyCode === 95)) {
      e.preventDefault();
    }
  },

  /**
    Check data for correctness.

    @method validateData
    @param {Object} model Stage model.
  */
  validateData(model) {
    let modelName = model.get('name');

    if (isBlank(modelName)) {
      return reject({ message: this.get('i18n').t('forms.fd-setting.error-message.empty-name').toString() });
    }

    const store = this.get('store');
    let predicate = new ComplexPredicate(Condition.And,
      new SimplePredicate('name', FilterOperator.Eq, modelName),
      new SimplePredicate('configuration', FilterOperator.Eq, model.get('configuration.id')),
      new SimplePredicate('id', FilterOperator.Neq, model.get('id')));

    const builder = new Builder(store)
    .from('fd-dev-stage')
    .selectByProjection('SearchRepObjView')
    .where(predicate);

    return store.queryRecord('fd-dev-stage', builder.build()).then((result) => {
      if (!isNone(result)) {
        return reject({ message: this.get('i18n').t('forms.fd-setting.error-message.exist-stage').toString() });
      }

      if (isBlank(model.get('product'))) {
        model.set('product', transliteration(modelName));
      }

      return resolve();
    });
  },

  actions: {
    /**
      Save stage.

       @method actions.save
    */
    save() {
      let stage = this.get('model.stage');

      this.get('appState').loading();
      this.validateData(stage)
      .then(() => stage.save())
      .then(() => {
        let adapter = this.get('store').adapterFor('application');
        let data = { 'project': stage.get('id'), 'moduleSettings': JSON.stringify(this.get('model.settings')) };

        return adapter.callAction('SaveCurrentModuleSettings', data, null, { withCredentials: true });
      })
      .catch((error) => {
        this.get('fdDialogService').showErrorMessage(error.message);
      })
      .finally(() => {
        this.get('appState').reset();
      });

    },

    /**
      Delete selected stage.

       @method actions.delete
    */
    delete() {
      let stage = this.get('model.stage');
      this.get('appState').loading();
      stage.destroyRecord()
      .then(() => {
        this.get('currentProjectContext').resetCurrentStage();
      })
      .catch((error) => {
        this.get('fdDialogService').showErrorMessage(error.message);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    }
  }
});

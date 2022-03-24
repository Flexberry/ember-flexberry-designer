import Controller from '@ember/controller';
import $ from 'jquery';
import FdSheetCloseConfirm from '../mixins/fd-sheet-close-confirm';
import FdReadonlyProjectMixin from '../mixins/fd-readonly-project';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { resolve, reject } from 'rsvp';
import { isNone, isBlank } from '@ember/utils';
import { transliteration } from '../utils/fd-transliteration';
import { set, computed } from '@ember/object';
import { getOwner } from '@ember/application';

import { SimplePredicate, ComplexPredicate } from 'ember-flexberry-data/query/predicate';
import Builder from 'ember-flexberry-data/query/builder';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';
import Condition from 'ember-flexberry-data/query/condition';
import FdPreloadStageMetadata from 'ember-flexberry-designer/utils/fd-preload-stage-metadata';

export default Controller.extend(FdSheetCloseConfirm, FdReadonlyProjectMixin, {
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
    Table headers.

    @property tableUsersAccess
    @type Array
  */
  tableUsersAccess: computed(() => (
    A([{
      columnCaption: 'forms.fd-setting.access-settings.name-user-caption',
      columnProperty: 'name',
      attrPlaceholder: 'forms.fd-setting.access-settings.name-user-placeholder',
      columnClass: 'three'
    },
    {
      columnCaption: 'forms.fd-setting.access-settings.login-user-caption',
      columnProperty: 'login',
      attrPlaceholder: 'forms.fd-setting.access-settings.login-user-placeholder',
      columnClass: 'four'
    },
    {
      columnCaption: 'forms.fd-setting.access-settings.user-access-caption',
      columnProperty: 'access',
      columnClass: 'four',
      isDropDown: true,
    }])
  )),

  /**
    Button locale path for usersAccessButton.

    @property usersAccessButton
    @type Object
  */
  usersAccessButton: computed(() => ({
    createBtn: 'forms.fd-setting.access-settings.create-btn',
    deleteBtn: 'forms.fd-setting.access-settings.delete-btn',
  })),

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
      let adapter = this.get('store').adapterFor('application');
      let stage = this.get('model.stage');

      this.get('appState').loading();
      this.validateData(stage)
      .then(() => stage.save())
      .then(() => {
        let data = { 'project': stage.get('id'), 'moduleSettings': JSON.stringify(this.get('model.settings')) };

        return adapter.callAction('SaveCurrentModuleSettings', data, null, { withCredentials: true });
      })
      .then(() => {
        let usersAccess = this.get('model.usersAccess');
        if (!isNone(usersAccess)) {
          let data = { 'project': stage.get('id'), 'newUsersInStage': JSON.stringify(usersAccess) };

          return adapter.callAction('SaveUsersAccessForStage', data, null, { withCredentials: true });
        }

        return resolve();
      })
      .then((usersAccessForStage) => {
        if (!isNone(usersAccessForStage)) {
          let newUsersAccess = JSON.parse(usersAccessForStage.value);
          this.set('model.usersAccess', A(newUsersAccess.data));
          if (newUsersAccess.errors.length !== 0) {
            return reject({ message: this.get('i18n').t('forms.fd-setting.error-message.empty-username').toString() + newUsersAccess.errors.join(', ') });
          }
        }

        return resolve();
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
      @param {Boolean} confirmation
    */
    delete(confirmation) {
      if (isNone(confirmation)) {
        this.get('fdDialogService').showVerificationMessage(this.get('i18n').t('components.fd-modal-message-box.delete-text').toString(), this.get('actions.delete'), this);
        return;
      }

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
    },

    /**
      Rename objects selected stage.

       @method actions.renameStage
       @param {Boolean} confirmation
    */
    renameStage(confirmation) {
      if (isNone(confirmation)) {
        this.get('fdDialogService').showVerificationMessage(this.get('i18n').t('forms.fd-setting.project-actions.rename-stage-text').toString(), this.get('actions.renameStage'), this);
        return;
      }

      let store = this.get('store');
      let adapter = store.adapterFor('application');
      let context = this.get('currentProjectContext');
      let stage = this.get('model.stage');

      let data = { 'stageId': stage.get('id'), 'isTranslation': true };

      adapter.callAction('RenameObjectsInStage', data, null, { withCredentials: true }).then(() => {

        this.get('appState').loading();
        context.resetCurrentStage();

        let modelName = 'fd-dev-stage';
        let predicate = new SimplePredicate('id', FilterOperator.Eq, stage.get('id'));
        let builder = new Builder(store)
          .from(modelName)
          .select('id,name,configuration.id')
          .where(predicate);

        return store.query(modelName, builder.build());
      }).then((result) => {
        if (result && result.get('length') === 1) {
          let stage = result.objectAt(0);
          context.setCurrentConfiguration(stage.get('configuration'));
          context.setCurrentStage(stage);

          return FdPreloadStageMetadata.call(this, store, context.getCurrentStage()).then(() =>
            context.getAutogeneratedSystemPromise()).then(() => {
              this.transitionToRoute('fd-setting');
            });
        }
      }).catch((error) => {
        this.get('fdDialogService').showErrorMessage(error.message);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    },

    /**
      Add audit in all class.

      @method actions.addAuditInAllClass
    */
    addAuditInAllClass() {
      let store = this.get('store');
      let adapter = store.adapterFor('application');
      const stage = this.get('currentProjectContext').getCurrentStage();
      const data = { project: stage };

      this.get('appState').loading();
      adapter.callFunction('AddAuditInAllClass', data, null, { withCredentials: true }).then((result) => {
        if (result.value) {
          FdPreloadStageMetadata.call(this, this.get('store'), this.get('currentProjectContext').getCurrentStage()).then(() =>
            this.get('currentProjectContext').getAutogeneratedSystemPromise()).then(() => {
              this.transitionToRoute('fd-setting');
            }).finally(() => {
              this.get('appState').reset();
            });
        }
      }).catch((error) => {
        this.get('fdDialogService').showErrorMessage(error.message);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    },

    /**
      Create 'UserAccess'.

      @method actions.createUserAccess
    */
    createUserAccess() {
      let usersAccess = this.get('model.usersAccess');
      usersAccess.pushObject({
        name: undefined,
        login: undefined,
        access: undefined
      });
    },

    /**
      Method remove 'store instances in type' from table.

      @method actions.deleteUserAccess
    */
    deleteUserAccess(selectedValues) {
      let usersAccess = this.get('model.usersAccess');
      usersAccess.removeObjects(selectedValues);
      selectedValues.clear();
    },

    /**
      Update 'Access'.

      @method actions.dropdownChangeAccess
    */
    dropdownChangeAccess(model, value) {
      set(model, 'access', value);
    },

    /**
      Run project backup.

      @method actions.backup
    */
    backup() {
      let store = this.get('store');
      let adapter = store.adapterFor('application');
      const stage = this.get('currentProjectContext').getCurrentStage();
      const data = { project: stage };

      adapter.callFunction('StageBackup', data, null, { withCredentials: true });
    },

    /**
      Run project export.

      @method actions.export
    */
    export() {
      const stage = this.get('currentProjectContext').getCurrentStage();
      // Import application config\environment.
      let appConfig = getOwner(this).factoryFor('config:environment').class;

      if (!isNone(appConfig) && !isNone(stage)) {
        const backendUrl = appConfig.APP.backendUrl;
        const getExportFileUrl = backendUrl + '/stageActions/StageImportExportFile?projectId=' + stage;

        this.get('appState').loading();

        $.flexberry.downloadFile({
          url: getExportFileUrl,
          onSuccess: () => {
            this.get('appState').reset();
          },
          onError: (errorMessage) => {
            this.get('appState').reset();
            const messageCaption = this.get('i18n').t('forms.fd-setting.project-actions.export-stage-error');
            this.get('fdDialogService').showErrorMessage(messageCaption + '\n' + errorMessage);
          }
        });
      }
    },

    /**
      Clear module settings of current stage.

      @method actions.clearModuleSettings
    */
    clearModuleSettings() {
      let store = this.get('store');
      let adapter = store.adapterFor('application');
      let stage = this.get('model.stage');

      adapter.callAction('ClearModuleSettings', { projectString: stage.get('id') });
    }
  }
});

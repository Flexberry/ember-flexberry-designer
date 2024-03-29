/**
  @module ember-flexberry-designer
*/

import Controller from '@ember/controller';
import FdPreloadStageMetadata from 'ember-flexberry-designer/utils/fd-preload-stage-metadata';
import FdSheetCloseConfirm from '../../mixins/fd-sheet-close-confirm';
import { computed } from '@ember/object';
import { isNone, isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';
import { Promise, resolve, reject } from 'rsvp';
import Builder from 'ember-flexberry-data/query/builder';
import { transliteration } from 'ember-flexberry-designer/utils/fd-transliteration';
import { A } from '@ember/array';
import { getOwner } from '@ember/application';

/**
  The controller for the project creation form.

  @class FdAllProjectsNewController
  @extends Ember.Controller
*/
export default Controller.extend(FdSheetCloseConfirm, {
  /**
    Current file selected for upload.

    @property _selectedFile
    @type Object
    @private
  */
  _selectedFile: undefined,

  /**
    The project name.

    @property projectName
    @type String
  */
  projectName: undefined,

  /**
    The product name.

    @property productName
    @type String
  */
  productName: undefined,

  /**
    The project description.

    @property projectDescription
    @type String
  */
  projectDescription: undefined,

  /**
    Access value.

    @property accessIsPublic
    @type Bool
  */
  accessIsPublic: true,

  /**
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: service(),

  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}{{/crossLink}}.

    @property currentProjectContext
    @type FdCurrentProjectContextService
  */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Locale key with example project name.

    @property nameExample
    @type String
    @readOnly
  */
  nameExample: computed(function() {
    // Parts of `forms/fd-all-projects` locale keys.
    let examples = ['library', 'school', 'university', 'museum', 'gallery'];
    let example = examples[Math.floor(Math.random() * examples.length)];

    return example;
  }).readOnly(),

  /**
    A search query on the project list that will be used as the project name.

    @property nameFromSearch
    @type String
    @default ''
  */
  nameFromSearch: '',

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property queryParams
  */
  queryParams: ['nameFromSearch'],

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
    Reset current stage file for import.

     @method resetSelectedFile
  */
  resetSelectedFile() {
    this.set('_selectedFile', undefined);
  },

  /**
    Check data for correctness.

    @method validateData
    @param {Object} model Class model.
  */
  validateData() {
    let name = this.get('projectName');

    if (isBlank(name)) {
      return reject({ message: this.get('i18n').t('forms.fd-all-projects.empty-name').toString() });
    }

    let allObjects = this.get('store').peekAll('fd-dev-stage');
    let currentObject = A(allObjects).findBy('name', name);

    if (!isNone(currentObject)) {
      return reject({ message: this.get('i18n').t('forms.fd-all-projects.exist-stage').toString() });
    }

    return resolve();
  },

  /**
    Create new stage from selected stage file, whitch posted to backend.

    @method createNewStage
    @param {String} projectName Project name.
    @param {String} product Product name.
    @param {String} description Description.
    @param {Object} configuration Current configuration.
    @param {Object} selectedFile Stage file in .crp or .zip format.
  */
  createNewStage(projectName, product, description, configuration, selectedFile) {
    const _this = this;

    return new Promise(function(resolve) {
      _this.get('appState').loading();
      let appConfig = getOwner(_this).factoryFor('config:environment').class;
      const backendUrl = appConfig.APP.backendUrl;
      const url = backendUrl + '/stageActions/StageImportExportFile';
      const formData = new FormData();
      formData.append('projectName', projectName);
      formData.append('product', product);
      formData.append('description', description);
      formData.append('configuration', configuration.get('id'));
      formData.append('stageFile', selectedFile);
      fetch(url, {
        method: "POST",
        body: formData
      })
      .then(function(response) {
        if (response.ok) {
          return response.text();
        } else {
          _this.get('appState').reset();
          _this.get('fdDialogService').showErrorMessage(response);
          return;
        }
      })
      .then(function(response)
      {
        return resolve(response);
      });
    });
  },


  actions: {
    /**
      Cancel create new stage.

      @method actions.cancelButton
    */
    cancelButton() {
      this.transitionToRoute('fd-all-projects');
    },

    /**
      Create new stage.

      @method actions.createStage
    */
    createStage() {
      const store = this.get('store');
      const currentProjectContext = this.get('currentProjectContext');

      let configuration = currentProjectContext.getCurrentConfigurationModel();

      return new Promise(function(resolve) {
        if (isNone(configuration)) {
          const modelName = 'fd-configuration';
          const builder = new Builder(store)
          .from(modelName)
          .selectByProjection('ListFormView')
          .top(1);

          return store.query(modelName, builder.build()).then(result => {
            configuration = result.firstObject;
            resolve();
          });
        } else {
          resolve();
        }
      })
      .then(() => this.validateData())
      .then(() => {
        const projectName = this.get('projectName');
        const productName = this.get('productName');

        // productName must be capitalized.
        let productNameFull = isBlank(productName) ? transliteration(projectName) : productName;
        let productNameFirst = productNameFull.substring(0, 1).toUpperCase();
        let productNameLeftovers = productNameFull.substring(1, productNameFull.length);

        const product = productNameFirst + productNameLeftovers;
        const description = this.get('projectDescription');
        const selectedFile = this.get("_selectedFile");

        if (!isNone(selectedFile)) {
          return this.createNewStage(projectName, product, description, configuration, selectedFile)
          .then((response) => {
            let builder = new Builder(store)
              .from('fd-dev-stage')
              .selectByProjection('FdPreloadMetadata')
              .byId(response);

            return store.queryRecord('fd-dev-stage', builder.build()).then((stage) => {
              return resolve(stage);
            });
          });
        } else {
          const stage = store.createRecord('fd-dev-stage', {
            name: projectName,
            product: product,
            description: this.get('projectDescription'),
            configuration: configuration,
          });

          this.get('appState').loading();
          return stage.save();
        }
      })
      .then((stage) => {
        currentProjectContext.setCurrentConfiguration(configuration);
        currentProjectContext.setCurrentStage(stage);

        return FdPreloadStageMetadata.call(this, store, currentProjectContext.getCurrentStage());
      })
      .then(() => currentProjectContext.getAutogeneratedSystemPromise())
      .then(() => {
        this.transitionToRoute('fd-diagrams');
      })
      .catch((error) => {
        this.get('fdDialogService').showErrorMessage(error.message);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    },

    /**
      Upload stage file hook.

      @method actions.upload
      @param {jQuery.Event} e event.
    */
    upload(e) {
      var file = e.target.files[0];
      this.set('_selectedFile', file);
    },
  }
});

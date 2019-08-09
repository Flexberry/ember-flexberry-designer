/**
  @module ember-flexberry-designer
*/

import Controller from '@ember/controller';
import FdPreloadStageMetadata from 'ember-flexberry-designer/utils/fd-preload-stage-metadata';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import uuid from 'npm:node-uuid';

/**
  The controller for the project creation form.

  @class FdAllProjectsNewController
  @extends Ember.Controller
*/
export default Controller.extend({
  /**
    The project name.

    @property projectName
    @type String
  */
  projectName: undefined,

  /**
    The project description.

    @property projectDescription
    @type String
  */
  projectDescription: undefined,

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
    return `forms.fd-all-projects.name-examples.${example}`;
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
      let store = this.get('store');
      let currentProjectContext = this.get('currentProjectContext');

      let repository = this.get('model.repository');
      let project = this.get('model.project');
      let configuration = this.get('model.configuration');

      let updateData = A();
      if (isNone(repository)) {
        repository = store.createRecord('fd-repository', {
          name: 'customRepository',
          id: uuid.v4()
        });

        updateData.pushObject(repository);
      }

      if (isNone(project)) {
        project = store.createRecord('fd-project', {
          name: 'customProject',
          repository: repository,
          id: uuid.v4()
        });

        updateData.pushObject(project);
      }

      if (isNone(configuration)) {
        configuration = store.createRecord('fd-configuration', {
          name: 'customConfiguration',
          project: project,
          id: uuid.v4()
        });

        updateData.pushObject(configuration);
      }

      let stage = store.createRecord('fd-dev-stage', {
        name: this.get('projectName'),
        description: this.get('projectDescription'),
        configuration: configuration,
      });

      this.get('appState').loading();

      new Promise(function(resolve) {
        if (updateData.length > 0) {
          resolve(store.batchUpdate(updateData));
        } else {
          resolve();
        }
      })
      .then(() => stage.save())
      .then(() => {
        currentProjectContext.setCurrentConfiguration(configuration);
        currentProjectContext.setCurrentStage(stage);

        return FdPreloadStageMetadata.call(this, store, currentProjectContext.getCurrentStage());
      })
      .then(() => currentProjectContext.getAutogeneratedSystemPromise())
      .then(() => {
        this.get('appState').reset();
        this.transitionToRoute('fd-application-model');
      })
      .catch(() => {
        this.get('appState').reset();
      });
    }
  }
});

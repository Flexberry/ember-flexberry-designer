/**
 * @module ember-flexberry-designer
 */
import Controller from '@ember/controller';
import { resolve } from 'rsvp';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

/**
 * The controller for the form with a generation settings.
 *
 * @class FdGenerationSettingsController
 * @extends Ember.Controller
 */
export default Controller.extend({

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
   * Generation settings file.
   *
   * @property {object} genSettingsFile
   */
  genSettingsFile: computed(function() {
    return {
      "ProjectId": "00000000-0000-0000-0000-000000000000",
      "CrpLocalPath": "sample.crp",
      "JsonMetadataPath": null,
      "OnlineCrpUrl": null,
      "OneShotToken": null,
      "GenPath": "../../../src",
      "GenerationItems": {
        "Validate": false,
        "Frontend": {
          "EmberJs": {
            "EmberApp": true,
            "EmberAddon": false,
            "Build": false,
            "GitClone": false,
            "GitPush": false,
            "GhPagesPush": false
          },
          "ApacheCordova": {
            "CordovaProject": false,
            "BuildApp": false
          }
        },
        "Backend": {
          "AspNet": false,
          "AspNetCore": true,
          "Java": false
        },
        "Docker": {
          "Dockerfile": false,
          "DockerfileAutobuild": false,
          "DockerBuildShellScript": false,
          "DockerSwarm": false
        },
        "Storage": {
          "Mssql": {
            "DiffSql": false,
            "FullSql": true,
            "Security": false,
            "AdminUser": false,
            "ConnectionString": null
          },
          "PostgreSql": {
            "DiffSql": false,
            "FullSql": true,
            "Security": false,
            "AdminUser": false,
            "ConnectionString": null
          },
          "ClickHouse": {
            "DiffSql": false,
            "FullSql": false,
            "ConnectionString": null
          },
          "Oracle": {
            "DiffSql": false,
            "FullSql": true,
            "ConnectionString": null
          },
          "Access": {
            "DiffSql": false,
            "FullSql": false,
            "ConnectionString": null
          }
        },
        "Docs": {
          "Csv": false,
          "Wmf": false
        },
        "Metadata": {
          "Crp": false,
          "Json": false
        }
      }
    }
  }),

  actions: {
    /**
      User disconnect from Github.

      @method actions.disconnectGithub
    */
    disconnectGithub() {
      let store = this.get('store');
      let adapter = store.adapterFor('application');

      adapter.callAction('ClearUserAuthData', { username: this.get('userService._username') });
    },

    /**
      Starts generation, opens its log when it starts successfully.

      @method actions.generate
    */
    generate() {
      return resolve();
    },
  }
})

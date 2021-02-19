/**
 * @module ember-flexberry-designer
 */
import Controller from '@ember/controller';

/**
 * The controller for the form with a generation settings.
 *
 * @class FdGenerationSettingsController
 * @extends Ember.Controller
 */
export default Controller.extend({

  /**
   * Generation settings file.
   *
   * @property {object} genSettingsFile
   */
  genSettingsFile: {
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
})
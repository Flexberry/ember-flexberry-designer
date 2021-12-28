/**
  @module ember-flexberry-designer
*/
import Route from '@ember/routing/route';
import FdShareLoadData from '../mixins/fd-share-load-data';
import { computed } from '@ember/object';

/**
 * Route for generation settings form.
 *
 * @class FdGenerationSettingsRoute
 * @extends Ember.Route
 */
export default Route.extend(FdShareLoadData, {

  /**
   * Generation settings file.
   *
   * @property {object} genSettingsFile
   */
  genSettingsFile: computed(function() {
    return {
      "Validate": false,
      "Frontend": {
        "EmberJs": {
          "EmberApp": true,
          "EmberAddon": false,
          "Build": false,
          "GitClone": false,
          "GitPush": false,
          "GhPagesPush": true,
          "Metadata": true
        },
        "ApacheCordova": {
          "CordovaProject": false,
          "BuildApp": false
        }
      },
      "Backend": {
        "AspNet": true,
        "AspNetCore": false,
        "Java": false
      },
      "Docker": {
        "Dockerfile": true,
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
  }),

  /**
    A hook you can use to setup the controller for the current route.
    [More info](https://www.emberjs.com/api/ember/release/classes/Route/methods/setupController?anchor=setupController).

    @method setupController
    @param {<a href="https://emberjs.com/api/ember/release/classes/Controller">Controller</a>} controller
  */
  setupController(controller) {
    this._super(...arguments);

    controller.set('genSettingsFile', this.get('genSettingsFile'));
    controller.set('routeName', this.get('routeName'));
  },

});

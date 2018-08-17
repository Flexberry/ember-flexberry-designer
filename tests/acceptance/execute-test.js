import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from '../helpers/start-app';

let dataForDestroy = Ember.A();
let app;

export function executeTest(testName, callback) {
  let store;
  let userSettingsService;

  moduleForAcceptance('Acceptance | ' + testName, {
    beforeEach() {

      // Start application.
      app = startApp();

      // Enable acceptance test mode in application controller (to hide unnecessary markup from application.hbs).
      let applicationController = app.__container__.lookup('controller:application');
      applicationController.set('isInAcceptanceTestMode', true);
      store = app.__container__.lookup('service:store');

      userSettingsService = app.__container__.lookup('service:user-settings');
      let getCurrentPerPage = function() {
        return 5;
      };

      userSettingsService.set('getCurrentPerPage', getCurrentPerPage);
    },

    afterEach(assert) {
      Ember.run(() => {
        if (dataForDestroy.length !== 0) {
          recursionDelete(0);
        } else {
          Ember.run(app, 'destroy');
        }
      });
    }
  });

  test(testName, (assert) => callback(store, assert, app));
}

/**
  Function to delete data after testing.

  @public
  @method addDataForDestroy
  @param {Object} data  or array of Object.
 */

export function addDataForDestroy(data) {
  if (Ember.isArray(data)) {
    dataForDestroy.addObjects(data);
  } else {
    dataForDestroy.addObject(data);
  }
}

function recursionDelete(index) {
  if (index < dataForDestroy.length) {
    if (!dataForDestroy[index].currentState.isDeleted) {
      dataForDestroy[index].destroyRecord().then(() => {
        recursionDelete(index + 1);
      });
    } else {
      recursionDelete(index + 1);
    }
  } else {
    dataForDestroy.clear();
    Ember.run(app, 'destroy');
  }
}

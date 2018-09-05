import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
import { addDataForDestroy } from './execute-test';

/**
  Function for waiting list loading afther refresh by function at acceptance test.

  @public
  @method refreshListByFunction
  @param {Function} refreshFunction Method options.
  @param {Object} controlle Current form controller.

  For use:
    Form controller must have the following code:
      ```js
        loadCount: 0
      ```

    Form router must have the following code:
      ```js
        onModelLoadingAlways(data) {
          let loadCount = this.get('controller.loadCount') + 1;
          this.set('controller.loadCount', loadCount);
        }
      ```
 */
export function refreshListByFunction(refreshFunction, controller) {
  return new Ember.RSVP.Promise((resolve, reject) => {
    let checkIntervalId;
    let checkIntervalSucceed = false;
    let checkInterval = 500;
    let renderInterval = 100;
    let timeout = 10000;
    let timeiutForLongTimeLoad = checkInterval + 500;

    let $lastLoadCount = controller.loadCount;
    refreshFunction();

    Ember.run(() => {
      checkIntervalId = window.setInterval(() => {
        let loadCount = controller.loadCount;
        if (loadCount === $lastLoadCount) {

          // Data isn't loaded yet.
          return;
        }

        // Data is loaded, wait to render.
        // Stop interval & resolve promise.
        window.setTimeout(() => {
          window.clearInterval(checkIntervalId);
          checkIntervalSucceed = true;
          resolve();
        }, renderInterval);
      }, checkInterval);
    });

    // Set wait timeout.
    Ember.run(() => {
      window.setTimeout(() => {
        // Timeout for with a long load, setInterval executed first.
        window.setTimeout(() => {
          if (checkIntervalSucceed) {
            return;
          }

          // Time is out.
          // Stop intervals & reject promise.
          window.clearInterval(checkIntervalId);
          reject('ListForm load operation is timed out');
        }, timeiutForLongTimeLoad);
      }, timeout);
    });
  });
}

/**
  Function for waiting editform loading afther open editform by function at acceptance test.

  @public
  @method openEditFormByFunction
  @param {Function} openEditFormFunction Method options.
 */
export function openEditFormByFunction(openEditFormFunction) {
  return new Ember.RSVP.Promise((resolve, reject) => {
    let checkIntervalId;
    let checkIntervalSucceed = false;
    let checkInterval = 500;
    let timeout = 10000;

    openEditFormFunction();

    Ember.run(() => {
      checkIntervalId = window.setInterval(() => {
        if (Ember.$('.ui.button.close-button').length === 0) {

          // Edit form isn't loaded yet.
          return;
        }

        // Edit form is loaded, wait to render.
        // Stop interval & resolve promise.
        window.setTimeout(() => {
          window.clearInterval(checkIntervalId);
          checkIntervalSucceed = true;
          resolve();
        });
      }, checkInterval);
    });

    // Set wait timeout.
    Ember.run(() => {
      window.setTimeout(() => {
        if (checkIntervalSucceed) {
          return;
        }

        // Time is out.
        // Stop intervals & reject promise.
        window.clearInterval(checkIntervalId);
        reject('editForm load operation is timed out');
      }, timeout);
    });
  });
}

// Create configuration and stage. Open it.
export function createConfigurationAndStage(store) {
  let project;
  let modelName = 'fd-project';
  let path = 'fd-appstruct-form';
  let builder = new Query.Builder(store).from(modelName);
  return new Ember.RSVP.Promise((resolve) => {
    store.query(modelName, builder.build()).then((result) => {
      let arr = result.toArray();
      project = arr.objectAt(0);
    }).then(function() {
      let newRecords = Ember.A();
      let configuration = newRecords.pushObject(store.createRecord('fd-configuration', {name: 'Configuration for test', project: project}));
      configuration.save().then(() => {
        addDataForDestroy(configuration);
        let stage = newRecords.pushObject(store.createRecord('fd-stage', {name: 'Stage for test', configuration: configuration}));
        stage.save().then(() => {
          addDataForDestroy(stage);
          visit(path);
          andThen(() => {
            resolve();
          });
        });
      });
    });
  });
}

// Function for waiting loading list.
export function loadingLocales(locale, app) {
  return new Ember.RSVP.Promise((resolve) => {
    let i18n = app.__container__.lookup('service:i18n');

    Ember.run(() => {
      i18n.set('locale', locale);
    });

    let timeout = 500;
    Ember.run.later((() => {
      resolve({ msg: 'ok' });
    }), timeout);
  });
}

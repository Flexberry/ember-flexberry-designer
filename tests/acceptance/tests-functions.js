import Ember from 'ember';

//import { addDataForDestroy } from './execute-test';

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

/**
  Function for waiting editform loading afther open editform by function at acceptance test.

  @public
  @method closeEditFormByFunction
  @param {Function} closeEditFormFunction Method options.
 */
export function closeEditFormByFunction(closeEditFormFunction) {
  return new Ember.RSVP.Promise((resolve, reject) => {
    let checkIntervalId;
    let checkIntervalSucceed = false;
    let checkInterval = 500;
    let timeout = 10000;

    closeEditFormFunction();

    Ember.run(() => {
      checkIntervalId = window.setInterval(() => {
        if (Ember.$('.ui.button.close-button').length !== 0) {

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

// Create stage, configuration, project and repository.
/**
  Function сreate stage, configuration, project and repository for test.

  @public
  @method closeEditFormByFunction
  @param {Object} store Current store.
  @param {Object} app Current application.
 */
export function createStage(store, app) {
  return new Ember.RSVP.Promise((resolve) => {
    let newRecords = Ember.A();
    let repository = newRecords.pushObject(store.createRecord('fd-repository', { name: 'Repository for test' }));
    repository.save().then(() => {

      //addDataForDestroy(repository);
      let project = newRecords.pushObject(store.createRecord('fd-project', { name: 'Project for test', repository: repository }));
      project.save().then(() => {

        //addDataForDestroy(project);
        let configuration = newRecords.pushObject(store.createRecord('fd-configuration', { name: 'Configuration for test', project: project }));
        configuration.save().then(() => {

          //addDataForDestroy(configuration);
          let currentContext = app.__container__.lookup('service:fd-current-project-context');
          currentContext.setCurrentConfiguration(configuration);
          let stage = newRecords.pushObject(store.createRecord('fd-dev-stage', { name: 'Stage for test', configuration: configuration }));
          stage.save().then(() => {

            //addDataForDestroy(stage);
            currentContext.setCurrentStage(stage);
            currentContext.getAutogeneratedSystemPromise().then(() => {
              resolve(stage);
            });
          });
        });
      });
    });
  });
}

// It's example of create class.
export function createClass(store, stage, name, stereotype = null) {
  return new Ember.RSVP.Promise((resolve) => {
    let newRecords = Ember.A();
    let createdClass = newRecords.pushObject(store.createRecord('fd-dev-class', { name: name, stage: stage, stereotype: stereotype }));

    //addDataForDestroy(createClass);
    createdClass.save().then(() => {
      resolve(createdClass);
    });
  });
}

// It's example of create attribute.
export function createAttribute(store, currentClass, name) {
  return new Ember.RSVP.Promise((resolve) => {
    let newRecords = Ember.A();
    let attribute = newRecords.pushObject(store.createRecord('fd-dev-attribute', { name: name, class: currentClass }));

    //addDataForDestroy(attribute);
    attribute.save().then(() => {
      resolve(attribute);
    });
  });
}

// It's example of create view.
export function createView(store, currentClass, name, stereotype) {
  return new Ember.RSVP.Promise((resolve) => {
    let viewName;
    switch (stereotype) {

      case '«listform»':
        viewName = name + 'L';
        break;

      case '«editform»':
        viewName = name + 'E';
        break;

      case undefined:
        break;

      default:
        throw new Error(`Wrong value at stereotype.`);
    }

    let newRecords = Ember.A();
    let view = newRecords.pushObject(store.createRecord('fd-dev-view', { name: viewName, class: currentClass }));

    //addDataForDestroy(view);
    view.save().then(() => {
      if (stereotype) {
        createClass(store, currentClass.get('stage'), viewName, stereotype).then((createdClass) => {
          let viewForm = newRecords.pushObject(store.createRecord('fd-dev-form-view', { name: viewName, class: createdClass, view: view }));

          //addDataForDestroy(viewForm);
          viewForm.save().then(() => {
            resolve(view, createdClass ,viewForm);
          });
        });
      } else {
        resolve(view);
      }
    });
  });
}

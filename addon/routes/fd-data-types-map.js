/**
  @module ember-flexberry-designer
*/

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';

/**
  Route for the edit form of the type map.

  @class FdDataTypesMapRoute
  @extends <a href="http://emberjs.com/api/classes/Ember.Route.html">Ember.Route</a>
*/
export default Route.extend({

  /**
    Service for managing the state of the component.

    @property fdDialogService
    @type fdDialogService
  */
  fdDialogService: service('fd-dialog-service'),

  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: service('fd-current-project-context'),

  /**
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: service(),

  actions: {
    /**
      See [EmberJS API](https://emberjs.com/).

      @method actions.didTransition
    */
    didTransition() {
      run.next(() => {
        this.set('controller.showTypeMap', true);

        // Save the type map if it has just been generated with default values.
        if (this.get('controller').findUnsavedFormData()) {
          this.get('controller').send('save');
        } else {
          this.get('appState').reset();
        }
      });
    },

    /**
      It sends message about transition to corresponding controller.

      The willTransition action is fired at the beginning of any attempted transition with a Transition object as the sole argument.
      [More info](http://emberjs.com/api/classes/Ember.Route.html#event_willTransition).

      @method actions.willTransition
      @param {Object} transition
    */
    willTransition(transition) {
      this._super(...arguments);
      let controller = this.get('controller');
      if (controller.findUnsavedFormData()) {
        const i18n = this.get('i18n');
        this.get('fdDialogService').showCustomMessage(
          i18n.t('forms.fd-data-types-map.save-message').toString(),
          i18n.t('forms.fd-data-types-map.save-title').toString(),
          true,
          i18n.t('forms.fd-data-types-map.save-button').toString(),
          i18n.t('forms.fd-data-types-map.rollback-button').toString(),
          controller.get('closeWithSaving'),
          controller.get('rollback'),
          controller
        );

        controller.set('abortedTransition', transition);
        transition.abort();
      }
    }
  },

  /**
    See [EmberJS API](https://emberjs.com/).

    @method model
  */
  model() {
    this.get('appState').loading();
    return {
      stage: this.get('currentContext').getCurrentStageModel(),
      classes: this.get('store').peekAll('fd-dev-class'),
    };
  },

  /**
    A hook you can use to setup the controller for the current route.
    [More info](https://www.emberjs.com/api/ember/release/classes/Route/methods/setupController?anchor=setupController).

    @method setupController
    @param {<a href="https://emberjs.com/api/ember/release/classes/Controller">Controller</a>} controller
  */
  setupController(controller) {
    this._super(...arguments);

    controller.set('routeName', this.get('routeName'));
    if (!controller.correctTypeMaps()) {
      this.get('appState').reset();
      this.get('fdDialogService').showErrorMessage(this.get('i18n').t('forms.fd-data-types-map.parser-error').toString());

      this.transitionTo('fd-setting');
    }
  },

  /**
    See [EmberJS API](https://emberjs.com/).

    @method model
  */
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('showTypeMap', false);
    }
  },
});

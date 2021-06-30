/**
 * @module ember-flexberry-designer
 */
import Controller from '@ember/controller';
import { resolve } from 'rsvp';

/**
 * The controller for the form with a generation settings.
 *
 * @class FdGenerationSettingsController
 * @extends Ember.Controller
 */
export default Controller.extend({

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

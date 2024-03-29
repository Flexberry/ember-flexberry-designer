/**
 * @module ember-flexberry-designer
 */
import Controller from '@ember/controller';
import { resolve } from 'rsvp';
import FdSheetCloseConfirm from '../mixins/fd-sheet-close-confirm';
/**
 * The controller for the form with a generation settings.
 *
 * @class FdGenerationSettingsController
 * @extends Ember.Controller
 */
export default Controller.extend(FdSheetCloseConfirm, {

  actions: {
    /**
      User disconnect from Github.

      @method actions.disconnectGithub
    */
    disconnectGithub() {
      let store = this.get('store');
      let adapter = store.adapterFor('application');

      adapter.callFunction('ClearUserAuthData');
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

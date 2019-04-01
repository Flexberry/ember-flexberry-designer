/**
  @module ember-flexberry-designer
*/

import Controller from '@ember/controller';
import { computed } from '@ember/object';

/**
  The controller for the form with the setting of the first generation.

  @class FdGenerationFirstController
  @extends Ember.Controller
*/
export default Controller.extend({
  /**
    Object with settings for generation.

    @property settings
    @type Object
  */
  settings: computed('model', function() {
    let settings = {};

    JSON.parse(this.get('model.value')).forEach((setting) => {
      switch (setting.Key) {
        case 'frontendgitrepourl':
          settings.gitUrl = setting.Value;
          break;

        case 'frontendlogin':
          settings.login = setting.Value;
          break;

        case 'frontendpassword':
          settings.password = setting.Value;
          break;
      }
    });

    return settings;
  }),
});

/**
  @module ember-flexberry-designer
*/

import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Mixin.create({
  /**
    ReadonlyMode current application.
    @property fdReadonlyModeService
  */
  fdReadonlyModeService: service('fd-readonly-mode-service'),

  /**
    Flag: indicates whether project is readonly.

    @property readonlyModeProject
    @type Boolean
   */
  readonlyModeProject: computed(function() {
    return this.get('fdReadonlyModeService').getReadonlyModeProject();
  }),
});

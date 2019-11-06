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
    Flag: indicates whether backend is readonly.

    @property readonlyModeOnBackend
    @type Boolean
   */
  readonlyModeOnBackend: computed(function() {
    return this.get('fdReadonlyModeService').getReadonlyModeFromBackend();
  }),
});

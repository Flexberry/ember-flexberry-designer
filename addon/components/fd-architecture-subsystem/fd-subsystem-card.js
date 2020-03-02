import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import layout from '../../templates/components/fd-architecture-subsystem/fd-subsystem-card';

export default Component.extend({
  layout,

  icon: undefined,

  header: undefined,

  type: undefined,

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  subsystemIsEnabled: computed('model.enabled', function() {
    if (this.get('type') ===  'FoundationSubsystemSettings') {
      return true;
    }

    return this.get('model.enabled');
  }),

  /**
    Flag: indicates whether component is readonly.

    @property readonly
    @type Boolean
   */
  readonly: false,

  actions: {
    editSubSystem() {
      this.get('fdSheetService').openSheet(this.get('sheetComponentName'), this.get('model'));
    }
  }
});

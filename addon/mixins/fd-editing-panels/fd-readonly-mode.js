import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({

  /**
    Flag: indicates whether property is readonly.

    @property readonlyMode
    @type Boolean
    @default true
   */
  readonlyMode: true,

  /**
    Flag: indicates whether property is readonly.

    @property readonly
    @type Boolean
   */
  readonly: computed('readonlyMode', 'model.isNew', function() {
    return this.get('readonlyMode') && !this.get('model.isNew');
  }),
});

import Component from '@ember/component';
import layout from '../../templates/components/fd-architecture-subsystem/fd-gis-subsystem';

export default Component.extend({
  layout,

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Flag: indicates whether component is readonly.

    @property readonly
    @type Boolean
   */
  readonly: false
});

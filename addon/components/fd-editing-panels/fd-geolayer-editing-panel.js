import Component from '@ember/component';
import FdReadonlyModeMixin from '../../mixins/fd-editing-panels/fd-readonly-mode';
import layout from '../../templates/components/fd-editing-panels/fd-geolayer-editing-panel';

export default Component.extend(FdReadonlyModeMixin, {
  layout,

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,
});

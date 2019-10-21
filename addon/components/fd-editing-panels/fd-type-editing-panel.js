import Component from '@ember/component';
import FdUpdateStoreInstancesValueMixin from '../../mixins/fd-editing-panels/fd-update-store-instances-value';
import FdReadonlyModeMixin from '../../mixins/fd-editing-panels/fd-readonly-mode';
import layout from '../../templates/components/fd-editing-panels/fd-type-editing-panel';

export default Component.extend(FdUpdateStoreInstancesValueMixin, FdReadonlyModeMixin, {
  layout,

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,
});

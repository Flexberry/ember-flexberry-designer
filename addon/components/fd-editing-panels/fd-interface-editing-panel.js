import Component from '@ember/component';
import FdReadonlyModeMixin from '../../mixins/fd-editing-panels/fd-readonly-mode';
import FdUpdateBsValueMixin from '../../mixins/fd-editing-panels/fd-update-bs-value';
import FdUpdateAttributeValueMixin from '../../mixins/fd-editing-panels/fd-update-attribute-value';
import FdUpdateMethodeValueMixin from '../../mixins/fd-editing-panels/fd-update-method-value';
import layout from '../../templates/components/fd-editing-panels/fd-interface-editing-panel';

export default Component.extend(FdUpdateBsValueMixin, FdUpdateAttributeValueMixin, FdUpdateMethodeValueMixin, FdReadonlyModeMixin, {
  layout,

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,
});

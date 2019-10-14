import Component from '@ember/component';
import FdUpdateFormviewValueMixin from '../../mixins/fd-editing-panels/fd-update-formview-value';
import FdReadonlyModeMixin from '../../mixins/fd-editing-panels/fd-readonly-mode';
import layout from '../../templates/components/fd-editing-panels/fd-editform-editing-panel';

export default Component.extend(FdUpdateFormviewValueMixin, FdReadonlyModeMixin, {
  layout,

  /**
    Form data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Class data.

    @property dataobject
    @type Object
    @default undefined
  */
  dataobject: undefined,
});

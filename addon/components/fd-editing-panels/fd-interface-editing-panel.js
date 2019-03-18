import Ember from 'ember';
import FdUpdateBsValueMixin from '../../mixins/fd-editing-panels/fd-update-bs-value';
import layout from '../../templates/components/fd-editing-panels/fd-interface-editing-panel';

export default Ember.Component.extend(FdUpdateBsValueMixin, {
  layout,

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,
});

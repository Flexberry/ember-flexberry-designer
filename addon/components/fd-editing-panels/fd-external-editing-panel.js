import Ember from 'ember';
import FdUpdateStoreInstancesValueMixin from '../../mixins/fd-editing-panels/fd-update-store-instances-value';
import layout from '../../templates/components/fd-editing-panels/fd-external-editing-panel';

export default Ember.Component.extend(FdUpdateStoreInstancesValueMixin, {
  layout,

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,
});

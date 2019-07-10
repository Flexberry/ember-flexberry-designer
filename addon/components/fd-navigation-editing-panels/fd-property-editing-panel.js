import Component from '@ember/component';
import layout from '../../templates/components/fd-navigation-editing-panels/fd-property-editing-panel';

export default Component.extend({
  layout,

  /**
    Node data.

    @property node
    @type Object
    @default undefined
  */
  node: undefined,
});

import Component from '@ember/component';
import layout from '../templates/components/fd-popup';
import { isNone } from '@ember/utils';
import { assert } from '@ember/debug';

export default Component.extend({
  layout,

  /**
    Namespace component.

    @property namespace
    @type String
  */
  namespace: undefined,

  init() {
    this._super(...arguments);

    let namespace = this.get('namespace');
    if (isNone(namespace)) {
      assert(`Please specify 'popupNamespace' property for the component`);
    }
  }
});

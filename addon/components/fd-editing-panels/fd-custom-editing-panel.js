import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import layout from '../../templates/components/fd-editing-panels/fd-custom-editing-panel';

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
    Add quotes for stereotype.

    @method stereotypeUpdate
  */
  stereotypeUpdate() {
    let stereotype = this.get('value');
    if (!isBlank(stereotype)) {
      if (stereotype[0] !== String.fromCharCode(171)) {
        stereotype = String.fromCharCode(171) + stereotype;
      }

      if (stereotype[stereotype.length - 1] !== String.fromCharCode(187)) {
        stereotype = stereotype + String.fromCharCode(187);
      }

      this.set('value', stereotype);
    }
  },
});

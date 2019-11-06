import Component from '@ember/component';
import layout from '../templates/components/fd-class-list-items';

export default Component.extend({
  layout,

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property tagName
  */
  tagName: '',

  /**
    Classes data.

    @property entity
    @type Object
    @default undefined
  */
  entity: undefined,

  /**
    Flag: indicates whether buttons is readonly.

    @property readonly
    @type Boolean
    @default false
   */
  readonly: false,
});

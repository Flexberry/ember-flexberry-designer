import Ember from 'ember';
import layout from '../templates/components/fd-class-list-items';

export default Ember.Component.extend({
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
  entity: undefined
});

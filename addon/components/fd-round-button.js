import FlexberryButtonComponent from 'ember-flexberry/components/flexberry-button';
import layout from '../templates/components/fd-round-button';
import { next } from '@ember/runloop';
import { isNone } from '@ember/utils';
import $ from 'jquery';

export default FlexberryButtonComponent.extend({
  layout,

  tagName: 'div',

  iconClass: 'icon-fd-plus-thin',

  classNames: ['fd-round-button'],

  colorClass: ' ',

  /**
    Components class names bindings.
    @property classNameBindings
    @type String[]
  */
  classNameBindings: ['colorClass'],

  didInsertElement() {
    this._super(...arguments);
  },

  actions: {
    buttonClicked(param) {
      let onButtonClick = this.onButtonClicked;
      if (!isNone(onButtonClick)) {
        onButtonClick(param);
      }
    }
  }
});

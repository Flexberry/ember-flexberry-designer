import FlexberryButtonComponent from 'ember-flexberry/components/flexberry-button';
import layout from '../templates/components/fd-round-button';
import { next } from '@ember/runloop';
import $ from 'jquery';

export default FlexberryButtonComponent.extend({
  layout,

  tagName: 'div',

  iconClass: 'icon-fd-plus-thin',

  classNames: ['fd-round-button'],

  colorClass: ' ',

  didInsertElement() {
    this._super(...arguments);
    next(() => {
      $(this.element).addClass(this.get('colorClass'));
    });
  }
});

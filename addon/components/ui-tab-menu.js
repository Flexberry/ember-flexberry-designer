import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/ui-tab-menu';

/**
ui-tab-menu component
@module components
@namespace components
@class UiTabMenu
@constructor
*/
export default Component.extend({
  layout: layout,

  tagName: 'div',

  classNameBindings: ['_uiClass', '_theme', '_componentClass'],

  _uiClass: 'ui',

  _componentClass: 'menu',

  theme: '',

  _theme: computed('theme', {
    get() {
      return this.get('theme') ? this.get('theme') : 'top attached tabular';
    }
  })
});

/* eslint-disable ember/closure-actions */
import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import { isNone } from '@ember/utils';

import FlexberryDropdown from 'ember-flexberry/components/flexberry-dropdown';
import layout from '../templates/components/fd-tab-dropdown';

export default FlexberryDropdown.extend({
  layout,
  dynamicChange: true,

  _items: computed('items.[]', function() {
    let items = this.get('items');
    let obj = null;

    if (isArray(items)) {
      obj = {};
      items.forEach(item => obj[item.dataTab] = item.title);
    }

    return obj || items;
  }),

  actions: {
    onChange(component, id, newValue) {
      let _this = this;
      _this.set('dynamicChange', false);
      this.get('items').forEach(function(element, index) {
        if (element.title === newValue) {
          _this.set('dynamicChange', index > -1);
        }
      });

      if (this.dynamicChange) {
        let oldValue = !isNone(this.get('value')) ? this.get('value') : null;
        newValue = !isNone(newValue) ? newValue : null;
        newValue = newValue === '<!---->' ? '' : newValue;

        if (newValue === oldValue) {
          return;
        }

        this.sendAction('onChange', newValue);
      }

    },

    onShowHide() {
      let _dynamicChange = this.dynamicChange;
      this.dynamicChange = true;
      return !this.get('destroyHasBeenCalled') && _dynamicChange;
    }
  }
});

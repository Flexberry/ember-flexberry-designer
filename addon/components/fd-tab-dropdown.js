import Ember from 'ember';
import FlexberryDropdown from 'ember-flexberry/components/flexberry-dropdown';
import layout from '../templates/components/fd-tab-dropdown';

export default FlexberryDropdown.extend({
  layout,
  dynamicChange: true,

  _items: Ember.computed('items.[]', function() {
    let items = this.get('items');
    let obj = null;

    if (Ember.isArray(items)) {
      obj = {};
      items.forEach(item => obj[item.dataTab] = item.title);
    }

    return obj || items;
  }),

  actions: {
    onChange(component, id, newValue) {

      this.dynamicChange = this.get('items').indexOf(newValue) > -1;
      if (this.dynamicChange) {
        let oldValue = !Ember.isNone(this.get('value')) ? this.get('value') : null;
        newValue = !Ember.isNone(newValue) ? newValue : null;
        newValue = newValue === '<!---->' ? '' : newValue;

        if (newValue === oldValue) {
          return;
        }
      }

      this.sendAction('onChange', newValue);
    },

    onShowHide() {
      let _dynamicChange = this.dynamicChange;
      this.dynamicChange = true;
      return !this.get('destroyHasBeenCalled') && _dynamicChange;
    }
  }
});

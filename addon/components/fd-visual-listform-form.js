/* eslint-disable ember/closure-actions */
import Component from '@ember/component';
import { computed } from '@ember/computed';

import layout from '../templates/components/fd-visual-listform-form';
import FdDataTypes from '../utils/fd-datatypes';

export default Component.extend({
  layout,

  _dataTypes: FdDataTypes.create(),

  indexLastAttribute: computed('attributes.length', function() {
    return this.get('attributes.length') - 1;
  }),

  fakeData: computed('attributes.@each.type', function() {
    let fakeData = [];
    let dataTypes = this.get('_dataTypes');
    let attributes = this.get('attributes');
    for (let i = 0; i < attributes.length; i++) {
      let type = dataTypes.flexberryTypeToFD(attributes[i].type);
      for (let j = 0; j < 4; j++) {
        if (i === 0) {
          fakeData.push([type ? dataTypes.randomValue(type) : null]);
        } else {
          fakeData[j].push(type ? dataTypes.randomValue(type) : null);
        }
      }
    }

    return fakeData;
  }),

  actions: {
    moveLeft(index) {
      this.sendAction('moveAttributeAction', index, index - 1);
    },

    moveRight(index) {
      this.sendAction('moveAttributeAction', index, index + 1);
    },
  },
});

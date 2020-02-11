/**
  @module ember-flexberry-designer
*/

import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default Mixin.create({

  /**
    Selected group.

    @property groupValue
    @type String
  */
  groupValue: computed('i18n.locale', 'groupValueLocale', {
    get() {
      return this.get('i18n').t(`${this.get('groupValueLocale')}`).toString();
    },
    set(key, value) {
      if (!isBlank(value) &&  this.get('i18n').t(`${this.get('groupValueLocale')}`).toString() !== value) {
        let groups = this.get('groupArray');
        let selectedGroup = groups.find((group) => this.get('i18n').t(`${group}`).toString() === value);
        this.set('groupValueLocale', selectedGroup);
      }

       return this.get('i18n').t(`${this.get('groupValueLocale')}`).toString();
    }
  }),

  /**
    Selected group locale.

    @property groupValueLocale
    @type Object
  */
  groupValueLocale: undefined,

  /**
    Array groups locales.

    @property groupArray
    @type Array
  */
  groupArray: undefined,

  /**
    Array groups string value.

    @property groupArrayString
    @type Array
  */
  groupArrayString: computed('groupArray', function() {
    return this.get('groupArray').map((a) => this.get('i18n').t(`${a}`).toString());
  })
});

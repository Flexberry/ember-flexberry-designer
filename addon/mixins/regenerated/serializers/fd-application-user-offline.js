import Mixin from '@ember/object/mixin';
import $ from 'jquery';

export let OfflineSerializer = Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      agent: { serialize: 'id', deserialize: 'records' },
      userAuthProfiles: { serialize: 'ids', deserialize: 'records' }
    };

    return $.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});

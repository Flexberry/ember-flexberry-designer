import Mixin from '@ember/object/mixin';
import $ from 'jquery';

export let OfflineSerializer = Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      businessServerClass: { serialize: 'id', deserialize: 'records' },
      classStorageTypes: { serialize: 'ids', deserialize: 'records' },
      views: { serialize: 'ids', deserialize: 'records' },
      methods: { serialize: 'ids', deserialize: 'records' },
      formViews: { serialize: 'ids', deserialize: 'records' },
      attributes: { serialize: 'ids', deserialize: 'records' }
    };

    return $.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});

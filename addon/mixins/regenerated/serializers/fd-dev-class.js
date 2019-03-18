import Mixin from '@ember/object/mixin';
import $ from 'jquery';

export let Serializer = Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      businessServerClass: { serialize: 'odata-id', deserialize: 'records' },
      classStorageTypes: { serialize: false, deserialize: 'records' },
      views: { serialize: false, deserialize: 'records' },
      methods: { serialize: false, deserialize: 'records' },
      formViews: { serialize: false, deserialize: 'records' },
      attributes: { serialize: false, deserialize: 'records' }
    };

    return $.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});

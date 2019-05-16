import Mixin from '@ember/object/mixin';
import $ from 'jquery';

export let OfflineSerializer = Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      typeDefinitions: { serialize: 'ids', deserialize: 'records' },
      controlTypes: { serialize: 'ids', deserialize: 'records' },
      users: { serialize: 'ids', deserialize: 'records' },
      moduleSettings: { serialize: 'ids', deserialize: 'records' },
      generations: { serialize: 'ids', deserialize: 'records' }
    };

    return $.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});

import Mixin from '@ember/object/mixin';
import $ from 'jquery';

export let OfflineSerializer = Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      configuration: { serialize: 'id', deserialize: 'records' },
      systems: { serialize: 'ids', deserialize: 'records' },
      inheritances: { serialize: 'ids', deserialize: 'records' },
      associations: { serialize: 'ids', deserialize: 'records' },
      classes: { serialize: 'ids', deserialize: 'records' }
    };

    return $.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});

import Mixin from '@ember/object/mixin';
import $ from 'jquery';

export let Serializer = Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      configuration: { serialize: 'odata-id', deserialize: 'records' },
      systems: { serialize: false, deserialize: 'records' },
      inheritances: { serialize: false, deserialize: 'records' },
      associations: { serialize: false, deserialize: 'records' },
      classes: { serialize: false, deserialize: 'records' }
    };

    return $.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});

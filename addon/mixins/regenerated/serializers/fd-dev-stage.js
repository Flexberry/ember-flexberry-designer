import Mixin from '@ember/object/mixin';
import $ from 'jquery';

export let Serializer = Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      typeDefinitions: { serialize: false, deserialize: 'records' },
      controlTypes: { serialize: false, deserialize: 'records' },
      users: { serialize: false, deserialize: 'records' },
      moduleSettings: { serialize: false, deserialize: 'records' },
      generations: { serialize: false, deserialize: 'records' }
    };

    return $.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});

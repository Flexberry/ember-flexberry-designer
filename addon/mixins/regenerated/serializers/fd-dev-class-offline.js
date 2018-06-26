import Ember from 'ember';

export let OfflineSerializer = Ember.Mixin.create({
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

    return Ember.$.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});

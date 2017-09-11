import Ember from 'ember';

export let OfflineSerializer = Ember.Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      stage: { serialize: 'id', deserialize: 'records' },
      diagrams: { serialize: 'ids', deserialize: 'records' },
      diagramLinks: { serialize: 'ids', deserialize: 'records' },
      filelinks: { serialize: 'ids', deserialize: 'records' }
    };

    return Ember.$.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});

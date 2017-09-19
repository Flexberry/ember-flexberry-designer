import Ember from 'ember';

export let OfflineSerializer = Ember.Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      configuration: { serialize: 'id', deserialize: 'records' },
      systems: { serialize: 'ids', deserialize: 'records' },
      inheritances: { serialize: 'ids', deserialize: 'records' },
      associations: { serialize: 'ids', deserialize: 'records' },
      classes: { serialize: 'ids', deserialize: 'records' }
    };

    return Ember.$.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});

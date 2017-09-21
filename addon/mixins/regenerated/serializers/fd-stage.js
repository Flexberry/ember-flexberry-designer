import Ember from 'ember';

export let Serializer = Ember.Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      configuration: { serialize: 'odata-id', deserialize: 'records' },
      systems: { serialize: false, deserialize: 'records' },
      inheritances: { serialize: false, deserialize: 'records' },
      associations: { serialize: false, deserialize: 'records' },
      classes: { serialize: false, deserialize: 'records' }
    };

    return Ember.$.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});

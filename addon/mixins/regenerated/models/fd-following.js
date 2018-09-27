import Ember from 'ember';
import DS from 'ember-data';

export let Model = Ember.Mixin.create({
  follow: DS.belongsTo('fd-user-auth-profile', { inverse: null, async: false }),
  follower: DS.belongsTo('fd-user-auth-profile', { inverse: 'following', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      follower: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});


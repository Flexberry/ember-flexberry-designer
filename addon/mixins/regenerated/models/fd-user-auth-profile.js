import Ember from 'ember';
import DS from 'ember-data';

export let Model = Ember.Mixin.create({
  authId: DS.attr('string'),
  name: DS.attr('string'),
  approved: DS.attr('boolean', { defaultValue: false }),
  authType: DS.belongsTo('fd-auth-type', { inverse: null, async: false }),
  applicationUser: DS.belongsTo('fd-application-user', { inverse: 'userAuthProfiles', async: false }),
  following: DS.hasMany('fd-following', { inverse: 'follower', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      authType: { presence: true },
      applicationUser: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});


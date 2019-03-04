import Ember from 'ember';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';
export let Model = Ember.Mixin.create({
  administrator: DS.attr('boolean', { defaultValue: false }),
  emailApproved: DS.attr('boolean', { defaultValue: false }),
  agent: DS.belongsTo('i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', { inverse: null, async: false }),
  userAuthProfiles: DS.hasMany('fd-user-auth-profile', { inverse: 'applicationUser', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      agent: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('ViewEdit', 'fd-application-user', {
    emailApproved: attr(''),
    administrator: attr(''),
    agent: belongsTo('i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', '', {
      name: attr(''),
      login: attr(''),
      pwd: attr(''),
      isUser: attr(''),
      isGroup: attr(''),
      isRole: attr(''),
      connString: attr(''),
      enabled: attr(''),
      email: attr('')
    })
  });
};

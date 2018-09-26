import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
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
    emailApproved: Projection.attr(''),
    administrator: Projection.attr(''),
    agent: Projection.belongsTo('i-c-s-soft-s-t-o-r-m-n-e-t-security-agent', '', {
      name: Projection.attr(''),
      login: Projection.attr(''),
      pwd: Projection.attr(''),
      isUser: Projection.attr(''),
      isGroup: Projection.attr(''),
      isRole: Projection.attr(''),
      connString: Projection.attr(''),
      enabled: Projection.attr(''),
      email: Projection.attr('')
    })
  });
};

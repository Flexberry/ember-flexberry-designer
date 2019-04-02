import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';

export let Model = Mixin.create({
  follow: DS.belongsTo('fd-user-auth-profile', { inverse: null, async: false }),
  follower: DS.belongsTo('fd-user-auth-profile', { inverse: 'following', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      follower: { presence: true }
    };
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});


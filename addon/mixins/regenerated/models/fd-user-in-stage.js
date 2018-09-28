import Ember from 'ember';
import DS from 'ember-data';

import AccessModeEnum from '../../../enums/new-platform-flexberry-web-designer-access-mode';
export let Model = Ember.Mixin.create({
  access: DS.attr('new-platform-flexberry-web-designer-access-mode', { defaultValue: AccessModeEnum.Read }),
  applicationUser: DS.belongsTo('fd-application-user', { inverse: null, async: false }),
  stage: DS.belongsTo('fd-dev-stage', { inverse: 'users', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      applicationUser: { presence: true },
      stage: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});


import Ember from 'ember';
import DS from 'ember-data';
import { attr } from 'ember-flexberry-data/utils/attributes';
export let Model = Ember.Mixin.create({
  name: DS.attr('string'),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('ModuleSettingTypeE', 'fd-dev-module-setting-type', {
    name: attr('Name')
  });
  modelClass.defineProjection('ModuleSettingTypeL', 'fd-dev-module-setting-type', {
    name: attr('')
  });
};

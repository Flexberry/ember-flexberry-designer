import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  name: DS.attr('string'),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
    };
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
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

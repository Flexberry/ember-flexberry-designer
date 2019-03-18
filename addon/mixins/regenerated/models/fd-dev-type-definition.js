import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  caption: DS.attr('string'),
  formatAttribute: DS.attr('string'),
  mapTypeAssemblyName: DS.attr('string'),
  mapTypeName: DS.attr('string'),
  name: DS.attr('string'),
  stage: DS.belongsTo('fd-dev-stage', { inverse: 'typeDefinitions', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      name: { presence: true },
      stage: { presence: true }
    };
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('TypeDefinitionE', 'fd-dev-type-definition', {
    name: attr(''),
    caption: attr(''),
    mapTypeName: attr(''),
    mapTypeAssemblyName: attr(''),
    formatAttribute: attr('')
  });
  modelClass.defineProjection('TypeDefinitionL', 'fd-dev-type-definition', {
    name: attr(''),
    caption: attr(''),
    mapTypeName: attr(''),
    mapTypeAssemblyName: attr(''),
    formatAttribute: attr('')
  });
};

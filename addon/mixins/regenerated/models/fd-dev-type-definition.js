import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
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
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('TypeDefinitionE', 'fd-dev-type-definition', {
    name: Projection.attr(''),
    caption: Projection.attr(''),
    mapTypeName: Projection.attr(''),
    mapTypeAssemblyName: Projection.attr(''),
    formatAttribute: Projection.attr('')
  });
  modelClass.defineProjection('TypeDefinitionL', 'fd-dev-type-definition', {
    name: Projection.attr(''),
    caption: Projection.attr(''),
    mapTypeName: Projection.attr(''),
    mapTypeAssemblyName: Projection.attr(''),
    formatAttribute: Projection.attr('')
  });
};
